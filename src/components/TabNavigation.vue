<template>
  <nav class="mt-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-center items-center">
        <div class="bg-gray-100 p-1 rounded-lg inline-flex">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.to"
            class="inline-flex items-center px-6 py-3 rounded-md text-base font-medium transition-all duration-200"
            :class="[
              isActiveTab(tab.to)
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            <LucideIcon
              v-if="tab.iconName"
              :name="tab.iconName"
              :size="18"
              :color="isActiveTab(tab.to) ? tab.brandColor : '#6b7280'"
              class="mr-2"
            />
            {{ tab.label }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import type { NavigationTab } from '@/config/navigation'

interface Props {
  tabs: NavigationTab[]
}

const props = defineProps<Props>()
const route = useRoute()

const isActiveTab = (path: string): boolean => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
