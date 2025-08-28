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
        <SocialPlatformHeader
          :platform="githubPlatform"
          class="mb-4 sm:mb-8 sm:hidden"
        />
        <div class="space-y-6">
          <div :id="'dashboard'">
            <DashboardSection :cards="dashboardCards" />
          </div>
          <div :id="'repos'">
            <RepoListSection
              :repos="githubRepos as Repo[]"
              :page="repoPage"
              :page-size="pageSize"
              :total="totalRepos"
              @update:page="repoPage = $event"
            />
          </div>
          <div :id="'commits'">
            <!-- Aquí podrías mostrar una sección de commits -->
          </div>
          <div :id="'analytics'">
            <AnalyticsSection />
          </div>
          <div :id="'monitoring'">
            <MonitoringSection :activities="recentActivity" />
          </div>
          <div :id="'settings'">
            <SettingsSection :platform-label="githubPlatform.label" />
          </div>
        </div>
      </div>
    </div>
  </SocialPlatformLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import SocialPlatformLayout from '@/layouts/SocialPlatformLayout.vue'
import SocialPlatformHeader from '@/components/layouts/SocialPlatformHeader.vue'
import SocialPlatformSidebar from '@/components/layouts/SocialPlatformSidebar.vue'
import DashboardSection from '@/components/sections/DashboardSection.vue'
import AnalyticsSection from '@/components/sections/AnalyticsSection.vue'
import MonitoringSection from '@/components/sections/MonitoringSection.vue'
import SettingsSection from '@/components/sections/SettingsSection.vue'
import SocialAccountCard from '@/components/ui/accountcard/SocialAccountCard.vue'
import { mockRecentActivity } from '@/mocks/socialPlatformData'
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

const { account: githubAccount, fetchAccount } = useGithubAccount()
const { repos: githubRepos, fetchRepos, totals, fetchTotals, fetchReposCount } = useGithubRepos()

const account = computed(() => githubAccount.value)
const activeSection = ref('dashboard')
const dashboardCards = computed(() => getGithubDashboardCards(totals.value ?? {}))
const recentActivity = ref(mockRecentActivity)

const repoPage = ref(1)
const pageSize = 6
const totalRepos = ref(0)

async function loadRepos() {
  const offset = (repoPage.value - 1) * pageSize
  await fetchRepos(pageSize, offset)
}

watch(repoPage, loadRepos, { immediate: true })

onMounted(async () => {
  fetchAccount()
  await loadRepos()
  totalRepos.value = await fetchReposCount()
  fetchTotals()
})


const githubMenu = useGithubMenu(activeSection)


</script>
