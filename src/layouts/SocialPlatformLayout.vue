<template>
  <div class="min-h-screen bg-gray-50 py-4 sm:py-8">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 min-w-0">
      <SocialAccountCard v-if="account" v-bind="account" class="mb-4 sm:mb-8" />

      <SocialPlatformHeader
        :platform="platform"
        v-model:activeSection="activeSection"
        class="mb-4 sm:mb-8"
      />

      <div class="space-y-6">
        <!-- Dashboard Section -->
        <DashboardSection v-if="activeSection === 'dashboard'" :cards="dashboardCards" />
        <RepoListSection
          v-if="activeSection === 'dashboard' && platform.name === 'github'"
          :repos="githubRepos as Repo[]"
        />

        <!-- Analytics Section -->
        <AnalyticsSection v-if="activeSection === 'analytics'" />

        <!-- Monitoring Section -->
        <MonitoringSection v-if="activeSection === 'monitoring'" :activities="recentActivity" />

        <!-- Settings Section -->
        <SettingsSection v-if="activeSection === 'settings'" :platform-label="platform.label" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SocialPlatformHeader from '@/components/layouts/SocialPlatformHeader.vue'
import DashboardSection from '@/components/sections/DashboardSection.vue'
import AnalyticsSection from '@/components/sections/AnalyticsSection.vue'
import MonitoringSection from '@/components/sections/MonitoringSection.vue'
import SettingsSection from '@/components/sections/SettingsSection.vue'
import SocialAccountCard from '@/components/ui/accountcard/SocialAccountCard.vue'
import type { AccountCardProps } from '@/components/ui/accountcard/AccountCardProps'
import type { Platform } from '@/types/platform'
import { mockStats, mockRecentActivity } from '@/mocks/socialPlatformData'
import { linkedinAccount, twitterAccount, instagramAccount } from '@/mocks/accountCardMocks'
import { useGithubAccount } from '@/composables/github/useGithubAccount'
import RepoListSection from '@/components/sections/RepoListSection.vue'
import { useGithubRepos } from '@/composables/github/useGithubRepos'
import type { Repo } from '@/types/repo'

interface Props {
  platform: Platform
  account?: AccountCardProps
}

const props = defineProps<Props>()

const { account: githubAccount, fetchAccount } = useGithubAccount()
const { repos: githubRepos, fetchRepos, totals, fetchTotals } = useGithubRepos()

const account = computed(() => {
  switch (props.platform.name) {
    case 'github':
      return githubAccount.value
    case 'linkedin':
      return linkedinAccount
    case 'twitter':
      return twitterAccount
    case 'instagram':
      return instagramAccount
    default:
      return undefined
  }
})

const activeSection = ref('dashboard')

import { getGithubDashboardCards } from '@/config/dashboardCards/github'

const dashboardCards = computed(() => {
  switch (props.platform.name) {
    case 'github':
      return getGithubDashboardCards(totals.value ?? {})
    // case 'linkedin':
    //   return getLinkedinDashboardCards(...)
    // case 'twitter':
    //   return getTwitterDashboardCards(...)
    // case 'instagram':
    //   return getInstagramDashboardCards(...)
    default:
      return []
  }
})
const recentActivity = ref(mockRecentActivity)

onMounted(() => {
  if (props.platform.name === 'github') {
    fetchAccount()
    fetchRepos()
    fetchTotals()
  }
})
</script>
