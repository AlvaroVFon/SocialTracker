import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Repo } from '@/types/repo'

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

  return {
    repos,
    loading,
    error,
    fetchRepos,
  }
}
