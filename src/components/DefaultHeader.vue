<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Monitor de redes sociales'
})
</script>
<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center">
      <h1 class="flex items-center gap-3 text-2xl font-bold text-gray-900">
        <LucideIcon name="BarChart3" size="32" color="#3b82f6" />
        {{ title }}
      </h1>
    </div>
  </header>
</template>
