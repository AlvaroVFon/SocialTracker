<template>
  <div
    class="bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-300 transition hover:shadow-md group"
  >
    <div class="flex flex-row justify-between gap-4">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <LucideIcon name="book" class="w-4 h-4 text-blue-500" />
          <a
            :href="repo.html_url"
            target="_blank"
            rel="noopener"
            class="font-semibold text-base text-gray-900 hover:text-blue-600 transition truncate"
            title="Ver en GitHub"
          >
            {{ repo.name }}
            <LucideIcon
              name="external-link"
              class="inline w-4 h-4 ml-1 text-blue-400 group-hover:text-blue-600"
            />
          </a>
        </div>
        <p v-if="repo.description" class="text-gray-500 text-xs mb-1 truncate">
          {{ repo.description }}
        </p>
        <div class="flex flex-wrap gap-2 text-xs mt-1">
          <RepoStatBadge
            v-if="repo.language"
            icon="code"
            color="bg-gray-50 text-gray-700"
            icon-color="text-gray-400"
          >
            {{ repo.language }}
          </RepoStatBadge>
          <RepoStatBadge icon="star" color="bg-yellow-50 text-yellow-700">
            {{ repo.stargazers_count }}
          </RepoStatBadge>
          <RepoStatBadge icon="eye" color="bg-blue-50 text-blue-700">
            {{ repo.watchers_count }}
          </RepoStatBadge>
          <RepoStatBadge icon="git-fork" color="bg-purple-50 text-purple-700">
            {{ repo.forks_count }}
          </RepoStatBadge>
        </div>
        <div class="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span class="flex items-center gap-1">
            <LucideIcon name="calendar" class="w-3 h-3" />
            Creado: {{ formatDate(repo.created_at) }}
          </span>
          <a
            :href="`/repos/${repo.id}/stats`"
            class="text-blue-600 hover:underline flex items-center gap-1"
          >
            <LucideIcon name="bar-chart" class="w-3 h-3" />
            Estadísticas
          </a>
        </div>
      </div>
      <!-- Columna derecha: vistas y clones -->
      <div class="flex flex-col items-end justify-end gap-2 min-w-[110px] min-h-[72px]">
        <RepoKpiItem icon="bar-chart-2" label="Vistas" :value="repo.total_views ?? 0" />
        <RepoKpiItem icon="copy" label="Clones" :value="repo.total_clones ?? 0" />
        <a
          :href="repo.html_url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
          title="Ver en GitHub"
        >
          <LucideIcon name="github" class="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RepoStatBadge from './RepoStatBadge.vue'
import RepoKpiItem from './RepoKpiItem.vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
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

defineProps<{ repo: Repo }>()
</script>
