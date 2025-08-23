<template>
  <span class="flex items-center gap-1 text-sm text-gray-500">
    <LucideIcon v-if="icon" :name="icon" :class="iconClass" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'

interface Props {
  icon?: string
  iconClass?: string
}

defineProps<Props>()
</script>
