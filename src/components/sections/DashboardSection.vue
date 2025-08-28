<template>
  <div v-if="cards && cards.length" class="rounded-lg bg-white p-3 sm:p-6 shadow">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Dashboard</h2>
    <div
      class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <StatCard
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :value="`${card.value}`"
        :subtitle="card.subtitle ?? ''"
        :color="card.color as 'blue' | 'green' | 'purple' | 'red' | 'yellow' | undefined"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from '@/components/ui/StatCard.vue'

interface StatCardData {
  title: string
  value: string | number
  subtitle?: string
  color?: string
}

defineProps<{ cards: StatCardData[] }>()
</script>
