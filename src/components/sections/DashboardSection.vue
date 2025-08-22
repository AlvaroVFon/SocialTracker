<template>
  <div class="rounded-lg bg-white p-6 shadow">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Seguidores"
        :value="stats.followers"
        :subtitle="`+${stats.followersGrowth || '0'}% este mes`"
        color="blue"
      />
      <StatCard
        title="Engagement"
        :value="`${stats.engagement || '0'}%`"
        subtitle="Promedio mensual"
        color="green"
      />
      <StatCard
        title="Publicaciones"
        :value="stats.posts"
        subtitle="Este mes"
        color="purple"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from '@/components/ui/StatCard.vue'

interface Stats {
  followers?: string
  followersGrowth?: string
  engagement?: string
  posts?: string
}

interface Props {
  stats: Stats
}

defineProps<Props>()
</script>
