<template>
  <div class="rounded-lg bg-white p-3 sm:p-6 shadow">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Configuración</h2>
    <div class="space-y-4 sm:space-y-6">
      <div>
        <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
          Configuración de {{ platformLabel }}
        </h3>
        <div class="space-y-3 sm:space-y-4">
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
