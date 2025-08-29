import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { PullRequest } from '../../types/repo'

export function useGithubAccount() {
  const account = ref(null)
  const pullRequests = ref<PullRequest[] | []>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAccount = async () => {
    loading.value = true
    error.value = null
    const { data, error: fetchError } = await supabase
      .from('github_account')
      .select('*')
      .eq('username', import.meta.env.VITE_GITHUB_USERNAME)
      .single()

    if (fetchError) {
      error.value = fetchError.message
      account.value = null
    } else {
      account.value = data
    }
    loading.value = false
    return account.value
  }

  const fetchPullRequests = async (page = 1, pageSize = 10) => {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    const {
      data,
      error: fetchError,
      count,
    } = await supabase
      .from('pull_requests')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (fetchError) {
      error.value = fetchError?.message || null
      pullRequests.value = []
      return { data: [], total: 0 }
    }

    pullRequests.value = data || []
    const total = count ?? (data ? data.length : 0)
    return { data: pullRequests.value, total }
  }

  return {
    account,
    pullRequests,
    loading,
    error,
    fetchAccount,
    fetchPullRequests,
  }
}
