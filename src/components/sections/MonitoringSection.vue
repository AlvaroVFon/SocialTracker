<template>
  <div class="rounded-lg bg-white p-6 shadow">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Monitoring</h2>
    <div class="space-y-4">
      <h3 class="text-lg font-medium text-gray-900">Actividad Reciente</h3>
      <div class="space-y-4">
        <ActivityCard v-for="(activity, index) in activities" :key="index" :activity="activity" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ActivityCard from '@/components/ui/ActivityCard.vue'

interface Activity {
  user: string
  content: string
  type: string
  time: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

interface Props {
  activities: Activity[]
}

defineProps<Props>()
</script>
