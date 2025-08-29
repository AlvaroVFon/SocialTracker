<template>
  <span class="flex items-center gap-1 text-xs text-gray-500">
    <LucideIcon :name="icon" class="w-3 h-3" />
    <span>{{ label }}:</span>
    <span class="font-medium text-gray-700">{{ value }}</span>
  </span>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'
defineProps<{ icon: string; label: string; value: string | number }>()
</script>
