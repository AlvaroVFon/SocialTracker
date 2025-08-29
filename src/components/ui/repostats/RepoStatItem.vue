<template>
  <div class="flex items-center gap-3 p-2 border border-gray-300 rounded" :class="$attrs.class">
    <span :class="['w-2 h-2 rounded-full shrink-0', accentClass]" aria-hidden="true" />
    <div class="flex flex-col">
      <span class="font-semibold text-lg text-gray-900">{{ value }}</span>
      <span class="text-xs text-gray-500">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number | string
  label: string
  color?: 'blue' | 'purple' | 'green' | 'gray'
}>()

const accentClass = {
  blue: 'bg-sky-200',
  purple: 'bg-violet-200',
  green: 'bg-emerald-200',
  gray: 'bg-gray-300',
}[props.color || 'gray']
</script>
