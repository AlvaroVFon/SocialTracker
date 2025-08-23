<template>
  <div class="min-h-screen bg-gray-50 py-4 sm:py-8">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 min-w-0">
      <SocialAccountCard v-if="account" v-bind="account" class="mb-4 sm:mb-8" />
      <!-- Header de la plataforma -->
      <div class="mb-4 sm:mb-8 rounded-lg bg-white p-3 sm:p-6 shadow">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <LucideIcon
              :name="platform.iconName"
              :size="28"
              :color="platform.iconColor"
              class="mr-3 sm:mr-4 text-gray-900"
            />
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
                {{ platform.label }} Analytics
              </h1>
              <p class="text-gray-600 text-sm sm:text-base">
                Monitoreo y análisis completo de {{ platform.label }}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 pb-1 min-w-0">
            <button
              v-for="section in navigationSections"
              :key="section.id"
              @click="activeSection = section.id"
              class="px-2 sm:px-3 py-1 sm:py-2 text-[11px] sm:text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-0 flex items-center"
              :class="[
                activeSection === section.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-100 text-gray-700 hover:text-gray-900',
              ]"
              tabindex="0"
              style="line-height: 1.1"
            >
              <LucideIcon
                :name="section.icon"
                :size="13"
                :class="'mr-1 sm:mr-2 shrink-0 sm:w-5 sm:h-5'"
              />
              <span class="truncate">{{ section.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Social Account Card -->

      <!-- Contenido de las secciones -->
      <div class="space-y-6">
        <!-- Dashboard Section -->
        <DashboardSection v-if="activeSection === 'dashboard'" :stats="stats" />

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
import { ref, computed } from 'vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import DashboardSection from '@/components/sections/DashboardSection.vue'
import AnalyticsSection from '@/components/sections/AnalyticsSection.vue'
import MonitoringSection from '@/components/sections/MonitoringSection.vue'
import SettingsSection from '@/components/sections/SettingsSection.vue'
import SocialAccountCard from '@/components/ui/accountcard/SocialAccountCard.vue'
import type { AccountCardProps } from '@/components/ui/accountcard/AccountCardProps'
import { sections as navigationSections } from '@/config/navigation'

import { mockStats, mockRecentActivity } from '@/mocks/socialPlatformData'
import {
  githubAccount,
  linkedinAccount,
  twitterAccount,
  instagramAccount,
} from '@/mocks/accountCardMocks'

interface Platform {
  name: string
  label: string
  iconName: string
  iconColor: string
}

interface Props {
  platform: Platform
  account?: AccountCardProps
}

const props = defineProps<Props>()

const account = computed(() => {
  switch (props.platform.name) {
    case 'github':
      return githubAccount
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

const stats = ref(mockStats)
const recentActivity = ref(mockRecentActivity)
</script>
