import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Commit, Repo, RepoMetrics, RepoTotals } from '@/types/repo'
import { getViewsData, getClonesData } from '@/composables/github/githubHelper'

export function useGithubRepos() {
  const repos = ref<Repo[]>()
  const totals = ref<RepoTotals>()
  const commits = ref<Commit[] | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  type RepoFilter = { query?: string; field?: string }

  const fetchRepos = async (limit = 10, offset = 0, filter?: RepoFilter) => {
    loading.value = true
    error.value = null
    let qb: unknown = supabase.from('repo_stats').select('*')

    if (filter && filter.query) {
      const q = `%${filter.query}%`
      if (filter.field) {
        //eslint-disable-next-line
        qb = (qb as unknown as any).ilike(filter.field, q)
      } else {
        //eslint-disable-next-line
        qb = (qb as unknown as any).or(`name.ilike.${q},description.ilike.${q},language.ilike.${q}`)
      }
    }

    //eslint-disable-next-line
    qb = (qb as unknown as any)
      .order('total_views', { ascending: false })
      .range(offset, offset + limit - 1)

    //eslint-disable-next-line
    const { data, error: fetchError } = await (qb as unknown as any)
    if (fetchError) {
      error.value = fetchError.message
      repos.value = []
    } else {
      repos.value = (data as Repo[]) || []
    }
    loading.value = false
    return repos.value
  }

  const fetchReposCount = async (filter?: RepoFilter) => {
    let qb: unknown = supabase.from('repo_stats').select('*', { count: 'exact', head: true })
    if (filter && filter.query) {
      const q = `%${filter.query}%`
      if (filter.field) {
        //eslint-disable-next-line
        qb = (qb as unknown as any).ilike(filter.field, q)
      } else {
        //eslint-disable-next-line
        qb = (qb as unknown as any).or(`name.ilike.${q},description.ilike.${q},language.ilike.${q}`)
      }
    }

    //eslint-disable-next-line
    const { count, error: fetchError } = await (qb as unknown as any)
    if (fetchError) {
      error.value = fetchError.message
      return 0
    }
    return count || 0
  }

  const fetchRepoStats = async (repoId: string) => {
    loading.value = true
    error.value = null
    const { data, error: fetchError } = await supabase
      .from('repo_stats')
      .select('*')
      .eq('id', repoId)
      .single()
    loading.value = false
    if (fetchError) {
      error.value = fetchError.message
      return null
    }
    return data as Repo | null
  }

  const fetchRepoMetrics = async (repoId: string) => {
    loading.value = true
    error.value = null
    const { data, error: fetchError } = await supabase
      .from('repo_metrics')
      .select('*')
      .eq('repo_id', repoId)
      .order('timestamp', { ascending: true })
    loading.value = false
    if (fetchError) {
      error.value = fetchError.message
      return null
    }

    return data as RepoMetrics[] | null
  }

  function getRepoMetrics(metrics: RepoMetrics[]) {
    return {
      views: getViewsData(metrics),
      clones: getClonesData(metrics),
    }
  }

  async function fetchTotals() {
    loading.value = true
    error.value = null
    const { data, error: fetchError } = await supabase
      .from('repo_metrics_totals')
      .select('*')
      .single()
    loading.value = false
    if (fetchError) {
      error.value = fetchError.message
      return null
    }

    totals.value = data as RepoTotals
    return data as RepoTotals | null
  }

  async function fetchCommits(prNumber: number) {
    loading.value = true
    error.value = null
    const { data, error: fetchError } = await supabase
      .from('pr_commits')
      .select('*')
      .eq('pr_number', prNumber)
      .order('date', { ascending: true })
    loading.value = false
    if (fetchError) {
      error.value = fetchError.message
      return null
    }

    console.log(data)

    commits.value = data as Commit[] | null

    return data as Commit[] | null
  }

  return {
    repos,
    totals,
    fetchCommits,
    loading,
    error,
    fetchRepos,
    fetchRepoStats,
    fetchRepoMetrics,
    fetchTotals,
    fetchReposCount,
    getRepoMetrics,
  }
}
