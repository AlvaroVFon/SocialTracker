<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'
import SocialTrackerIcon from './icons/SocialTrackerIcon.vue';

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Monitor de redes sociales'
})
</script>
<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-center">
      <h1 class="flex items-center gap-3 text-3xl font-light text-gray-700 tracking-wider">
        <SocialTrackerIcon name="BarChart3" size="40" color="#3b82f6" />
        {{ title }}
      </h1>
    </div>
  </header>
</template>
