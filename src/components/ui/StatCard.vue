<template>
  <div
    class="rounded-lg border border-gray-200 p-4 sm:p-6 flex flex-col items-center sm:items-start text-center sm:text-left"
  >
    <h3 class="text-base sm:text-lg font-medium text-gray-900">{{ title }}</h3>
    <p class="mt-1 sm:mt-2 text-4xl sm:text-3xl font-extrabold" :class="valueColorClass">
      {{ value || '0' }}
    </p>
    <p class="mt-1 text-xs sm:text-sm text-gray-500">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value?: string
  subtitle: string
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
})

const valueColorClass = computed(() => {
  const colorMap = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
  }
  return colorMap[props.color]
})
</script>
