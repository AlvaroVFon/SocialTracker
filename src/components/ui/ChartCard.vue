<template>
  <div class="rounded-lg border border-gray-200 p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>
    <div class="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <span class="text-gray-500">{{ placeholder }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Gráfico'
})
</script>
