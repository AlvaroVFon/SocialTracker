<template>
  <div class="rounded-lg bg-white p-6 shadow">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ChartCard
        title="Engagement por Día"
        placeholder="Gráfico de engagement diario"
      />
      <ChartCard
        title="Crecimiento de Seguidores"
        placeholder="Gráfico de crecimiento"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChartCard from '@/components/ui/ChartCard.vue'

// Props para datos de analytics si se necesitan en el futuro
interface Props {
  data?: any
}

defineProps<Props>()
</script>
