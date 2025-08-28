<template>
  <nav class="mt-6 sm:mt-10 sticky top-0 z-40 bg-gray-50">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-14 sm:h-16 justify-center items-center">
        <div class="bg-gray-100 p-1 rounded-lg flex flex-wrap gap-1 sm:gap-2">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.to"
            class="flex items-center px-2 sm:px-5 py-1.5 sm:py-2.5 rounded-md text-xs sm:text-base font-medium transition-all duration-200"
            :class="[
              isActiveTab(tab.to)
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
          >
            <LucideIcon
              v-if="tab.iconName"
              :name="tab.iconName"
              :size="15"
              :color="isActiveTab(tab.to) ? tab.brandColor : '#6b7280'"
              :class="'mr-1 sm:mr-2 sm:w-5 sm:h-5'"
            />
            {{ tab.label }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import type { NavigationTab } from '@/config/navigation'

interface Props {
  tabs: NavigationTab[]
}

defineProps<Props>()
const route = useRoute()

const isActiveTab = (path: string): boolean => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
