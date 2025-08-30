import { createClient } from "@supabase/supabase-js";
process.loadEnvFile();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY,
);

const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
};

async function fetchAllRepos() {
  const res = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_OWNER}/repos?per_page=100`,
    { headers },
  );

  if (!res.ok)
    throw new Error(`Error fetching repos: ${res.status} ${res.statusText}`);
  return await res.json();
}

async function fetchRepoTraffic(repoName) {
  try {
    const viewsRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${repoName}/traffic/views`,
      { headers },
    );
    const clonesRes = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${repoName}/traffic/clones`,
      { headers },
    );

    if (!viewsRes.ok || !clonesRes.ok) return { views: [], clones: [] }; // repos nuevos o sin tráfico

    const views = await viewsRes.json();
    const clones = await clonesRes.json();
    return { views: views.views || [], clones: clones.clones || [] };
  } catch {
    return { views: [], clones: [] };
  }
}

async function getAccountId() {
  const { data, error } = await supabase
    .from("github_account")
    .select("id")
    .eq("username", process.env.GITHUB_OWNER)
    .single();

  if (error) throw new Error(`Error getting account_id: ${error.message}`);
  return data.id;
}

async function upsertRepo(repo, accountId) {
  const { data, error } = await supabase
    .from("repos")
    .upsert(
      {
        github_id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description || null,
        language: repo.language || null,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count || 0,
        watchers_count: repo.watchers_count || 0,
        forks_count: repo.forks_count || 0,
        account_id: accountId,
      },
      { onConflict: "github_id" },
    )
    .select(); // Usar PRIMARY KEY como conflicto

  if (error) console.error("Error al guardar el repo en Supabase:", error);

  return data[0].id;
}

async function insertRepoMetrics(repoId, views, clones) {
  for (const view of views) {
    await supabase.from("repo_metrics").upsert(
      {
        repo_id: repoId,
        type: "view",
        timestamp: view.timestamp,
        count: view.count,
        uniques: view.uniques,
      },
      {
        onconflict: ["repo_id", "type", "timestamp"],
      },
    );
  }
  for (const clone of clones) {
    await supabase.from("repo_metrics").upsert(
      {
        repo_id: repoId,
        type: "clone",
        timestamp: clone.timestamp,
        count: clone.count,
        uniques: clone.uniques,
      },
      { onConflict: ["repo_id", "type", "timestamp"] },
    );
  }
}

export async function mainRepoMetrics() {
  try {
    const accountId = await getAccountId();
    const repos = await fetchAllRepos();

    for (const repo of repos) {
      const repoId = await upsertRepo(repo, accountId);
      const { views, clones } = await fetchRepoTraffic(repo.name);
      await insertRepoMetrics(repoId, views, clones);
    }

    console.log("Todos los repos actualizados correctamente.");
  } catch (err) {
    console.error("Error general:", err.message);
  }
}

mainRepoMetrics();
