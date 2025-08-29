export interface Repo {
  id: string
  github_id: number
  name: string
  description?: string
  html_url: string
  language?: string
  created_at: string
  updated_at?: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  account_id: string
  total_views?: number
  total_clones?: number
}

export interface RepoMetrics {
  id: string
  repo_id: string
  type: 'view' | 'clone'
  timestamp: string
  count: number
  uniques: number
}

export interface RepoTotals {
  total_views: number | string
  total_unique_views: number | string
  total_clones: number | string
  total_unique_clones: number | string
}

export interface PullRequest {
  pr_number: number
  author_id: number
  author_name: string
  author_avatar_url: string
  state: 'open' | 'closed' | 'merged'
  title: string
  created_at: Date | string
  updated_at: Date | string
  closed_at?: Date | string
  repo_name: string
  url: string
  commits_url?: string
}
