<template>
  <aside class="w-full sm:w-56 flex-shrink-0 bg-white border-r border-gray-100 h-full py-6 px-2 flex flex-col gap-2 sticky top-12 z-30 overflow-y-auto rounded-xl shadow">
    <div class="flex items-center gap-2 mb-4 px-2">
      <LucideIcon :name="platform.iconName" :size="22" :color="platform.iconColor" />
      <span class="font-bold text-lg text-gray-900 truncate">{{ platform.label }}</span>
    </div>
    <nav class="flex flex-col gap-1">
      <template v-for="item in menuItems" :key="item.id">
        <component
          :is="item.href ? 'a' : 'button'"
          :href="item.href"
          @click="handleMenuClick(item)"
          class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          :class="item.active ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:text-gray-900'"
        >
          <LucideIcon :name="item.icon" :size="16" :color="item.active ? 'white' : undefined" />
          <span class="truncate">{{ item.label }}</span>
        </component>
      </template>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'

import type { Platform } from '@/types/platform'
import { defineProps } from 'vue'

interface MenuItem {
  id: string
  label: string
  icon: string
  href?: string
  active?: boolean
  onClick?: () => void
}

const props = defineProps<{
  platform: Platform
  menuItems: MenuItem[]
}>()

function handleMenuClick(item: MenuItem) {
  if (item.onClick) item.onClick()
}
</script>
