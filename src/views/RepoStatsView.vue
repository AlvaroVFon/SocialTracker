<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-5xl mx-auto px-4">
      <div class="flex items-center gap-4 mb-4">
        <div class="flex-1 min-w-0">
          <router-link to="/github" class="text-gray-500 hover:underline text-xs">← Volver a repositorios</router-link>
          <h1 class="font-semibold text-lg text-gray-900 mt-1 truncate">Estadísticas de {{ repo?.name || '...' }}</h1>
          <p class="text-gray-400 text-sm mt-1" v-if="repo?.description">{{ repo.description }}</p>
        </div>
        <a v-if="repo" :href="repo.html_url" target="_blank" class="text-gray-500 hover:underline text-sm">Ver en GitHub</a>
      </div>
      <div v-if="loading" class="text-center py-10 text-gray-400">Cargando estadísticas...</div>
      <div v-else-if="repo" class="space-y-6">
        <div class="py-2">
          <RepoStatsGroup>
            <template #main>
              <RepoStatItem
                label="Estrellas"
                :value="repo.stargazers_count"
                color="blue"
                class=""
              />
              <RepoStatItem
                label="Forks"
                :value="repo.forks_count"
                color="purple"
                class=""
              />
              <RepoStatItem
                label="Watchers"
                :value="repo.watchers_count"
                color="green"
                class=""
              />
              <RepoStatItem
                label="Lenguaje"
                :value="repo.language || '-'"
                color="gray"
                class=""
              />
            </template>
            <template #totals>
              <RepoStatItem
                label="Total vistas"
                :value="repo.total_views ?? 0"
                color="blue"
                class=""
              />
              <RepoStatItem
                label="Total clones"
                :value="repo.total_clones ?? 0"
                color="purple"
                class=""
              />
            </template>
          </RepoStatsGroup>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <BarChart
              :chartData="{
                labels: ['Estrellas', 'Forks', 'Watchers', 'Vistas', 'Clones'],
                datasets: [
                  {
                    label: 'Estadísticas',
                    backgroundColor: '#3b82f6',
                    data: [
                      repo.stargazers_count,
                      repo.forks_count,
                      repo.watchers_count,
                      repo.total_views,
                      repo.total_clones,
                    ],
                  },
                ],
              }"
              :chartOptions="{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true,
                    text: 'Stats Overview',
                    align: 'center',
                    font: { size: 18, weight: 'bold' },
                    padding: { top: 10, bottom: 10 },
                  },
                },
              }"
            />
          </div>

          <div class="space-y-6">
            <div>
              <LineChart
                :chartData="{
                  labels: views.map((v) => v.date),
                  datasets: [
                    {
                      label: 'Views',
                      borderColor: '#3b82f6',
                      backgroundColor: 'rgba(59,130,246,0.1)',
                      data: views.map((v) => v.views),
                      tension: 0.3,
                      fill: true,
                    },
                    {
                      label: 'Uniques',
                      borderColor: '#a855f7',
                      backgroundColor: 'rgba(168,85,247,0.1)',
                      data: views.map((c) => c.uniques),
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }"
                :chartOptions="{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: {
                      display: true,
                      text: 'Views',
                      align: 'center',
                      font: { size: 18, weight: 'bold' },
                      padding: { top: 10, bottom: 10 },
                    },
                  },
                }"
              />
            </div>

            <div>
              <LineChart
                :chartData="{
                  labels: clones.map((v) => v.date),
                  datasets: [
                    {
                      label: 'Clones',
                      borderColor: '#3b82f6',
                      backgroundColor: 'rgba(59,130,246,0.1)',
                      data: clones.map((v) => v.clones),
                      tension: 0.3,
                      fill: true,
                    },
                    {
                      label: 'Uniques',
                      borderColor: '#a855f7',
                      backgroundColor: 'rgba(168,85,247,0.1)',
                      data: clones.map((c) => c.uniques),
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }"
                :chartOptions="{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: {
                      display: true,
                      text: 'Clones',
                      align: 'center',
                      font: { size: 18, weight: 'bold' },
                      padding: { top: 10, bottom: 10 },
                    },
                  },
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 py-10">Repositorio no encontrado.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RepoStatItem from '@/components/ui/repostats/RepoStatItem.vue'
import RepoStatsGroup from '@/components/ui/repostats/RepoStatsGroup.vue'
import BarChart from '@/components/ui/charts/BarChart.vue'
import LineChart from '@/components/ui/charts/LineChart.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGithubRepos } from '@/composables/github/useGithubRepos'
import type { Repo, RepoMetrics } from '@/types/repo'

const route = useRoute()
const repo = ref<Repo | null>(null)
const repoMetrics = ref<RepoMetrics[] | null>(null)
const views = ref<{ date: string; views: number; uniques: number }[]>([])
const clones = ref<{ date: string; clones: number; uniques: number }[]>([])
const loading = ref(true)
const { fetchRepoStats, fetchRepoMetrics, getRepoMetrics } = useGithubRepos()

onMounted(async () => {
  const repoId = route.params.id
  if (!repoId) return
  loading.value = true

  const data = await fetchRepoStats(repoId as string)
  if (data) repo.value = data

  const metricsData = await fetchRepoMetrics(repoId as string)
  if (metricsData) repoMetrics.value = metricsData

  const { views: viewsData, clones: clonesData } = getRepoMetrics(repoMetrics.value || [])
  views.value = viewsData
  clones.value = clonesData

  loading.value = false
})
</script>
