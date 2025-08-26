import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Repo, RepoMetrics } from '@/types/repo'

export function useGithubRepos() {
  const repos = ref<Repo[]>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchRepos = async () => {
    loading.value = true
    error.value = null
    const { data, error: fetchError } = await supabase
      .from('repo_stats')
      .select('*')
      .order('total_views', { ascending: false })
    if (fetchError) {
      error.value = fetchError.message
      repos.value = []
    } else {
      repos.value = (data as Repo[]) || []
    }
    loading.value = false
    return repos.value
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

  function getViewsData(metrics: RepoMetrics[] | null) {
    if (!metrics) return []
    return metrics
      .filter((m) => m.type === 'view')
      .map((m) => ({ date: m.timestamp, views: m.count, uniques: m.uniques }))
  }

  function getClonesData(metrics: RepoMetrics[] | null) {
    if (!metrics) return []
    return metrics
      .filter((m) => m.type === 'clone')
      .map((m) => ({ date: m.timestamp, clones: m.count, uniques: m.uniques }))
  }

  function getRepoMetrics(metrics: RepoMetrics[]) {
    return {
      views: getViewsData(metrics),
      clones: getClonesData(metrics),
    }
  }

  return {
    repos,
    loading,
    error,
    fetchRepos,
    fetchRepoStats,
    fetchRepoMetrics,
    getRepoMetrics,
  }
}
