import { createClient } from "@supabase/supabase-js";
process.loadEnvFile()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY,
);

const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
};

async function fetchGitHubEvents() {
  const username = process.env.GITHUB_OWNER;
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged&sort=updated&order=desc`,
    {
      headers,
    },
  );

  if (!res.ok) {
    throw new Error(
      `Error fetching GitHub account: ${res.status} ${res.statusText}`,
    );
  }

  return await res.json();
}

async function fetchPullRequestCommits(owner, repo, prNumber, headers) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/commits`,
    { headers },
  );

  if (!res.ok) {
    throw new Error(
      `Error fetching PR commits: ${res.status} ${res.statusText}`,
    );
  }

  const commits = await res.json();

  const enrichedCommits = await Promise.all(
    commits.map(async (commit) => {
      const commitRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits/${commit.sha}`,
        { headers },
      );

      if (!commitRes.ok) {
        throw new Error(
          `Error fetching commit stats for ${commit.sha}: ${commitRes.status} ${commitRes.statusText}`,
        );
      }

      const commitDetails = await commitRes.json();

      return {
        ...commit,
        stats: commitDetails.stats,
      };
    }),
  );

  return enrichedCommits;
}

const data = await fetchGitHubEvents();

function preparePullRequestData(data) {
  const parts = data.repository_url.split("/");
  const repo = parts[parts.length - 1];

  return {
    author: {
      id: data.user.id,
      name: data.user.login,
      avatar_url: data.user.avatar_url,
    },
    pr: {
      number: data.number,
      state: data.state,
      title: data.title,
      created_at: data.created_at,
      updated_at: data.updated_at,
      closed_at: data.closed_at,
      repo_name: repo,
      url: data.html_url,
    },
  };
}

async function upsertPullRequest(prData) {
  const { data, error } = await supabase.from("pull_requests").upsert(
    {
      author_id: prData.author.id,
      author_name: prData.author.name,
      author_avatar_url: prData.author.avatar_url,
      state: prData.pr.state,
      title: prData.pr.title,
      created_at: prData.pr.created_at,
      updated_at: prData.pr.updated_at,
      closed_at: prData.pr.closed_at,
      repo_name: prData.pr.repo_name,
      pr_number: prData.pr.number,
      url: prData.pr.url,
    },
    { onConflict: ["url"], returning: "minimal" },
  );

  if (error) console.error("Error al guardar en Supabase:", error);

  return data;
}

const prepareCommitData = (commit, prNumber, repoName) => ({
  pr_number: prNumber,
  repo_name: repoName,
  sha: commit.sha,
  author_name: commit.commit.author.name,
  author_email: commit.commit.author.email,
  message: commit.commit.message,
  date: commit.commit.author.date,
  url: commit.html_url,
  additions: commit.stats ? commit.stats.additions : null,
  deletions: commit.stats ? commit.stats.deletions : null,
});

async function upsertCommits(commit) {
  const { data, error } = await supabase.from("pr_commits").upsert(commit, {
    onConflict: ["url"],
    returning: "minimal",
  });

  if (error) console.error("Error al guardar en Supabase:", error);
  return data;
}

export async function mainPullRequests() {
  try {
    for (const item of data.items) {
      const prData = preparePullRequestData(item);

      const res = await fetchPullRequestCommits(
        process.env.GITHUB_OWNER,
        prData.pr.repo_name,
        prData.pr.number,
      );

      for (const commit of res) {
        const commitData = prepareCommitData(
          commit,
          prData.pr.number,
          prData.pr.repo_name,
        );
        await upsertCommits(commitData);
      }

      await upsertPullRequest(prData);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

mainPullRequests();
