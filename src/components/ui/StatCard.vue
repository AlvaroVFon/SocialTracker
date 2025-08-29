<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 bg-white shadow-sm min-w-[160px]">
      <LucideIcon :name="iconName" class="w-6 h-6 text-gray-400" />
      <div class="flex flex-col items-center">
        <span class="text-lg font-bold text-gray-900">{{ value || '0' }}</span>
        <span class="text-xs text-gray-600">{{ title }}</span>
      </div>
    </div>
    <p v-if="subtitle" class="text-xs sm:text-sm text-gray-500 mt-1">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'

interface Props {
  title: string
  value?: string
  subtitle: string
  iconName: string
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
})

</script>
