<template>
  <div class="flex items-center gap-2">
    <div class="flex items-center flex-1 bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      <button class="px-3 text-gray-400" aria-hidden="true" tabindex="-1">
        <LucideIcon name="search" size="18" class="text-gray-400" />
      </button>
      <input
        v-model="internalValue"
        :placeholder="placeholder"
        @keydown.enter="onSearch"
        class="flex-1 px-2 py-2 text-sm outline-none"
        :aria-label="placeholder"
      />
      <button
        v-if="internalValue"
        @click="() => (internalValue = '')"
        class="px-2 text-sm text-gray-500 hover:text-gray-700"
        aria-label="Limpiar búsqueda"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRef } from 'vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  debounce?: number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'search', payload: { query: string }): void
}>()

const modelValue = toRef(props, 'modelValue')
const debounceMs = props.debounce ?? 300

const internalValue = ref(modelValue.value ?? '')

let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => modelValue.value,
  (v) => {
    if (v !== internalValue.value) internalValue.value = v || ''
  }
)

watch(internalValue, (v) => {
  emits('update:modelValue', v)
  if (timer) clearTimeout(timer)
    if (debounceMs && debounceMs > 0) {
    timer = setTimeout(() => {
      emits('search', { query: v })
    }, debounceMs)
  } else {
    emits('search', { query: v })
  }
})

function onSearch() {
  if (timer) clearTimeout(timer)
  emits('search', { query: internalValue.value })
}
</script>
