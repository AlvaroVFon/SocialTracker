<template>
  <div class="rounded-lg bg-white p-3 sm:p-6 shadow">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Repositorios</h2>
    <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <RepoStatsCard v-for="repo in repos" :key="repo.id" :repo="repo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Repo } from '@/types/repo'
import RepoStatsCard from '@/components/ui/repostats/RepoStatsCard.vue'

defineProps<{ repos: Repo[] }>()
</script>
