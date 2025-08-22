<template>
  <div class="rounded-lg bg-white p-6 shadow">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Configuración</h2>
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Configuración de {{ platformLabel }}</h3>
        <div class="space-y-4">
          <ToggleCard
            title="Notificaciones de menciones"
            description="Recibe alertas cuando te mencionen"
            :default-enabled="true"
          />
          <ToggleCard
            title="Análisis automático"
            description="Genera reportes automáticamente"
            :default-enabled="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleCard from '@/components/ui/ToggleCard.vue'

interface Props {
  platformLabel: string
}

defineProps<Props>()
</script>
