<template>
  <SocialPlatformLayout>
    <div class="flex flex-col sm:flex-row gap-6">
      <SocialPlatformSidebar
        :platform="githubPlatform"
        :menuItems="githubMenu"
        class="hidden sm:block"
      />
      <div class="flex-1 min-w-0">
  <SocialAccountCard v-if="account" v-bind="account as any" class="mb-4 sm:mb-8" />
        <SocialPlatformHeader :platform="githubPlatform" class="mb-4 sm:mb-8 sm:hidden" />
        <div class="space-y-6">
          <div :id="'dashboard'">
            <DashboardSection title="KPI's" :cards="dashboardCards" />
          </div>
          <div :id="'pullrequests'">
            <MonitoringSection
              :items="pullRequest"
              type="pullrequest"
              section-title="Pull Requests"
              :page="prPage"
              :page-size="prPageSize"
              :total="prTotal"
              @update:page="prPage = $event"
            />
          </div>
          <div :id="'repos'">
            <RepoListSection
              :repos="githubRepos as Repo[]"
              :page="repoPage"
              :page-size="pageSize"
              :total="totalRepos"
              @update:page="repoPage = $event"
              @search="onRepoSearch"
            />
          </div>
        </div>
      </div>
    </div>
  </SocialPlatformLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue'
import type { PullRequest } from '@/types/repo'
import SocialPlatformLayout from '@/layouts/SocialPlatformLayout.vue'
import SocialPlatformHeader from '@/components/layouts/SocialPlatformHeader.vue'
import SocialPlatformSidebar from '@/components/layouts/SocialPlatformSidebar.vue'
import DashboardSection from '@/components/sections/DashboardSection.vue'
import MonitoringSection from '@/components/sections/MonitoringSection.vue'
import SocialAccountCard from '@/components/ui/accountcard/SocialAccountCard.vue'
import { useGithubAccount } from '@/composables/github/useGithubAccount'
import RepoListSection from '@/components/sections/RepoListSection.vue'
import { useGithubRepos } from '@/composables/github/useGithubRepos'
import type { Repo } from '@/types/repo'
import { getGithubDashboardCards } from '@/config/dashboardCards/github'
import { useGithubMenu } from '@/config/navigation/githubMenu'

const githubPlatform = {
  name: 'github',
  label: 'GitHub',
  iconName: 'github',
  iconColor: '#181717',
}

const { account: githubAccount, fetchAccount, pullRequests, fetchPullRequests } = useGithubAccount()
const { repos: githubRepos, fetchRepos, totals, fetchTotals, fetchReposCount } = useGithubRepos()

const account = computed(() => githubAccount.value)
const prPage = ref(1)
const prPageSize = 4
const prTotal = ref(0)
const pullRequest = ref<PullRequest[]>([])

async function loadPullRequests() {
  const { data, total } = await fetchPullRequests(prPage.value, prPageSize)
  pullRequest.value = data
  prTotal.value = total
}

watch(prPage, loadPullRequests, { immediate: true })
const activeSection = ref('dashboard')
const dashboardCards = computed(() => getGithubDashboardCards((totals.value ?? {}) as any))

const repoPage = ref(1)
const pageSize = 6
const totalRepos = ref(0)
const searchQuery = ref('')

async function loadRepos() {
  const offset = (repoPage.value - 1) * pageSize
  await fetchRepos(pageSize, offset, {
  query: searchQuery.value || undefined,
  })
}

async function loadReposCount() {
  totalRepos.value = await fetchReposCount({
  query: searchQuery.value || undefined,
  })
}

watch(repoPage, loadRepos, { immediate: true })

onMounted(async () => {
  fetchAccount()
  await loadPullRequests()
  await loadRepos()
  totalRepos.value = await fetchReposCount()
  fetchTotals()
})

watch(searchQuery, async () => {
  repoPage.value = 1
  await loadReposCount()
  await loadRepos()
})

function onRepoSearch(payload: { query: string }) {
  searchQuery.value = payload.query || ''
  repoPage.value = 1
  loadReposCount()
  loadRepos()
}

const githubMenu = useGithubMenu(activeSection)
</script>
