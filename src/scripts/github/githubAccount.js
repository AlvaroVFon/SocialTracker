import { createClient } from "@supabase/supabase-js";
process.loadEnvFile()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY,
);

const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
};

async function fetchGitHubAccount() {
  const username = process.env.GITHUB_OWNER;
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers,
  });

  if (!res.ok) {
    throw new Error(
      `Error fetching GitHub account: ${res.status} ${res.statusText}`,
    );
  }

  return await res.json();
}

async function upsertGitHubAccount(account) {
  const { data, error } = await supabase.from("github_account").upsert(
    {
      username: account.login,
      avatar_url: account.avatar_url || null,
      name: account.name || null,
      company: account.company || null,
      location: account.location || null,
      bio: account.bio || null,
      public_repos: account.public_repos || 0,
      followers: account.followers || 0,
      following: account.following || 0,
      created_at: account.created_at,
      updated_at: new Date(),
    },
    { onConflict: "username" },
  );

  if (error) console.error("Error al guardar en Supabase:", error);

  return data;
}

export async function mainGitHubAccount() {
  try {
    const account = await fetchGitHubAccount();
    await upsertGitHubAccount(account);
    console.log(`Account saved successfully: ${account.login}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

mainGitHubAccount();
