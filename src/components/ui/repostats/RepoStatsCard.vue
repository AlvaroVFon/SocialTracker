<template>
  <div
    class="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-5 flex flex-col gap-3 w-full"
  >
    <div class="flex items-center gap-2 mb-2">
      <span class="font-medium text-base text-gray-900 truncate">{{ repo.name }}</span>
      <a
        :href="repo.html_url"
        target="_blank"
        rel="noopener"
        class="ml-auto text-blue-600 hover:underline text-xs"
        title="Ver en GitHub"
      >
        Ver en GitHub
      </a>
    </div>
    <p v-if="repo.description" class="text-gray-500 text-xs">{{ repo.description }}</p>
    <div class="flex gap-2 text-xs text-gray-500">
      <span v-if="repo.language">{{ repo.language }}</span>
      <span v-if="repo.language">·</span>
      <span>⭐ {{ repo.stargazers_count }}</span>
      <span>· 👁️ {{ repo.watchers_count }}</span>
      <span>· 🍴 {{ repo.forks_count }}</span>
    </div>
    <div class="flex gap-4 text-xs text-gray-700 mt-1">
      <span>
        <span class="font-semibold text-gray-800">Total vistas:</span>
        {{ repo.total_views ?? 0 }}
      </span>
      <span>
        <span class="font-semibold text-gray-800">Total clones:</span>
        {{ repo.total_clones ?? 0 }}
      </span>
    </div>
    <div class="flex justify-between items-center mt-2 text-xs text-gray-300">
      <span>Creado: {{ formatDate(repo.created_at) }}</span>
      <a :href="`/repos/${repo.id}/stats`" class="text-blue-500 hover:underline">Estadísticas</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/formatDate'
import type { Repo as RepoBase } from '@/types/repo'

interface Repo extends RepoBase {
  total_views?: number
  total_clones?: number
  stats?: {
    stars: number
    forks: number
    watchers: number
    uniques: number
  }
}

interface Stats {
  stars: number
  forks: number
  watchers: number
  uniques: number
}

defineProps<{ repo: Repo; stats?: Stats }>()
</script>
