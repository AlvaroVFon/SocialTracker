<template>
  <div class="rounded-lg bg-white p-3 sm:p-6 shadow">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Repositorios</h2>
    <div class="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <RepoStatsCard v-for="repo in repos" :key="repo.id" :repo="repo" />
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

interface Props {
  repos: Repo[]
  page: number
  pageSize: number
  total: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:page', value: number): void }>()

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:page', page)
  }
}
</script>
