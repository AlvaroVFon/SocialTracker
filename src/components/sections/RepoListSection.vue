<template>
  <div class="rounded-lg bg-white p-3 sm:p-6 shadow">
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Repositorios</h2>
      <div class="w-56 sm:w-72 flex-shrink-0">
        <SearchBar v-model="localQuery" placeholder="Buscar..." @search="onSearch" />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      <RepoStatsCard v-for="repo in filteredRepos" :key="repo.id" :repo="repo" />
    </div>
    <Pagination
      :page="props.page"
      :page-size="props.pageSize"
      :total="props.total"
      @update:page="goToPage"
    />
  </div>
</template>

<script setup lang="ts">
import type { Repo } from '@/types/repo'
import RepoStatsCard from '@/components/ui/repostats/RepoStatsCard.vue'
import Pagination from '@/components/ui/Pagination.vue'
import { defineProps, defineEmits, computed } from 'vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import { ref } from 'vue'

interface Props {
  repos: Repo[]
  page: number
  pageSize: number
  total: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'search', payload: { query: string }): void
}>()
const localQuery = ref('')

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

const filteredRepos = computed(() => {
  if (!localQuery.value) return props.repos ?? []
  const q = localQuery.value.toLowerCase()
  return (props.repos || []).filter((r) => (r.name || '').toLowerCase().includes(q) || (r.description || '').toLowerCase().includes(q) || (r.language || '').toLowerCase().includes(q))
})

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:page', page)
  }
}

function onSearch(payload: { query: string; field?: string }) {
  emit('search', payload)
}
</script>
