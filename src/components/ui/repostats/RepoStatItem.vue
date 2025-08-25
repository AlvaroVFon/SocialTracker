<template>
  <div class="bg-gray-50 rounded p-2 flex flex-col items-center">
    <span :class="['font-bold text-lg', colorClass]">{{ value }}</span>
    <span class="text-xs text-gray-500">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number
  label: string
  color?: 'blue' | 'purple' | 'green' | 'gray'
}>()

const colorClass = {
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  green: 'text-green-600',
  gray: 'text-gray-800',
}[props.color || 'gray']
</script>
