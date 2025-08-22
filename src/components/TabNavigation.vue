<template>
  <nav class="border-b border-gray-200 bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex space-x-8">
            <router-link
              v-for="tab in tabs"
              :key="tab.name"
              :to="tab.to"
              class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200"
              :class="[
                isActiveTab(tab.to)
                  ? 'border-blue-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              ]"
            >
              <LucideIcon v-if="tab.iconName" :name="tab.iconName" :size="16" class="mr-2" />
              {{ tab.label }}
            </router-link>
          </div>
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
