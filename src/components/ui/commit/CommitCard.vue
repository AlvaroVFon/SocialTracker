<template>
  <li class="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
    <div class="flex items-start gap-3">
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <div class="font-medium text-gray-900">
            <span>{{ commit.author_name }}</span>
            <span class="text-gray-500 text-xs ml-2">— {{ formatDateFn(commit.date) }}</span>
          </div>
          <a v-if="commit.url" :href="commit.url" target="_blank" class="text-blue-500 hover:underline text-xs flex items-center gap-1">
            <LucideIcon name="git-commit" class="w-3 h-3" />
            Ver en GitHub
          </a>
        </div>

        <div class="text-sm text-gray-700 mt-1">
          <div v-if="!isExpanded">{{ subject }}</div>
          <div v-else class="whitespace-pre-line">{{ commit.message }}</div>
          <button @click.prevent="toggle" class="text-xs text-gray-500 mt-2 hover:underline">
            {{ isExpanded ? 'Ver menos' : 'Ver más' }}
          </button>
        </div>

        <div class="text-xs text-gray-500 mt-2 font-mono">#{{ commit.sha }}</div>
      </div>
      <div class="text-xs text-right flex flex-col gap-1">
        <div class="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+{{ commit.additions }}</div>
        <div class="text-red-600 bg-red-50 px-2 py-0.5 rounded">-{{ commit.deletions }}</div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Commit } from '@/types/repo'
import { formatDate } from '@/utils/formatDate'
import LucideIcon from '@/components/icons/LucideIcon.vue'

const props = defineProps<{ commit: Commit }>()

const isExpanded = ref(false)
function toggle() {
  isExpanded.value = !isExpanded.value
}

const subject = computed(() => (props.commit.message || '').split('\n')[0])
function formatDateFn(d: string | Date) {
  return formatDate(String(d))
}
</script>
