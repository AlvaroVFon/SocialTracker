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
