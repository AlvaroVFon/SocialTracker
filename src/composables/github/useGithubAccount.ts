import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export function useGithubAccount() {
  const account = ref(null)
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

  return {
    account,
    loading,
    error,
    fetchAccount,
  }
}
