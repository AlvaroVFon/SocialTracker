<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header de la plataforma -->
      <div class="mb-8 rounded-lg bg-white p-6 shadow">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <LucideIcon :name="platform.iconName" :size="32" class="mr-4 text-gray-900" />
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ platform.label }} Analytics</h1>
              <p class="text-gray-600">Monitoreo y análisis completo de {{ platform.label }}</p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button
              v-for="section in navigationSections"
              :key="section.id"
              @click="activeSection = section.id"
              class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
              :class="[
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              <LucideIcon :name="section.icon" :size="16" class="mr-2" />
              {{ section.label }}
            </button>
          </div>
        </div>
      </div>

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
import { sections as navigationSections } from '@/config/navigation'
import { mockStats, mockRecentActivity } from '@/mocks/socialPlatformData'

interface Platform {
  name: string
  label: string
  iconName: string
}

interface Props {
  platform: Platform
}

const props = defineProps<Props>()

const activeSection = ref('dashboard')

// Datos de ejemplo que se podrían cargar dinámicamente
const stats = ref(mockStats)
const recentActivity = ref(mockRecentActivity)
</script>
