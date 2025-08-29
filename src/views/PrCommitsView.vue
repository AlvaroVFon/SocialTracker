<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="flex items-center gap-3">
        <router-link to="/github" class="text-gray-500 text-xs hover:underline">← Volver</router-link>
        <h1 class="text-lg font-semibold mt-0 mb-4">Commits PR #{{ prNumber }}</h1>
      </div>

      <div v-if="loading" class="text-center text-gray-400 py-8">Cargando commits...</div>
      <div v-else>
        <ul class="space-y-3">
          <CommitCard v-for="c in commits" :key="c.id" :commit="c" />
        </ul>
        <div v-if="!commits || commits.length === 0" class="text-center text-gray-400 py-6">No se encontraron commits.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGithubRepos } from '@/composables/github/useGithubRepos'
import type { Commit } from '@/types/repo'
import CommitCard from '@/components/ui/commit/CommitCard.vue'

const route = useRoute()
const prNumber = route.params.prNumber as string
const commits = ref<Commit[]>([])
const loading = ref(true)
const { fetchCommits } = useGithubRepos()

onMounted(async () => {
  loading.value = true
  const data = await fetchCommits(Number(prNumber))
  if (data) commits.value = data
  loading.value = false
})
</script>
