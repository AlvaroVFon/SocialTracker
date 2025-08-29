<template>
  <span :class="badgeClass">
    <LucideIcon :name="icon" class="w-3 h-3" :class="iconColor" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  color?: string
  iconColor?: string
}>()

const badgeClass = computed(() => {
  return [
    'inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs',
    props.color || 'bg-gray-50 text-gray-700',
  ]
})
</script>
