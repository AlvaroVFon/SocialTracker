<template>
  <div v-if="totalPages > 1" class="flex justify-center mt-6 gap-1">
    <button
      class="px-2 py-1 border border-gray-300 text-gray-500 bg-white hover:bg-gray-100 rounded"
      :disabled="props.page === 1"
      @click="$emit('update:page', props.page - 1)"
    >&#8592;</button>
    <span class="px-2 py-1 text-gray-500">{{ props.page }} / {{ totalPages }}</span>
    <button
      class="px-2 py-1 border border-gray-300 text-gray-500 bg-white hover:bg-gray-100 rounded"
      :disabled="props.page === totalPages"
      @click="$emit('update:page', props.page + 1)"
    >&#8594;</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  page: number
  pageSize: number
  total: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:page', value: number): void }>()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
</script>
