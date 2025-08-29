<template>
  <div class="rounded-lg bg-white p-3 sm:p-6 shadow">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{{ sectionTitle }}</h2>
    <div class="space-y-3 sm:space-y-4">
      <div class="space-y-3 sm:space-y-4">
        <template v-if="type === 'activity'">
          <ActivityCard v-for="(item, index) in items" :key="index" :activity="item as Activity" />
        </template>
        <template v-else-if="type === 'pullrequest'">
          <PullRequestCard
            v-for="(item, index) in items"
            :key="index"
            :pullRequest="item as PullRequest"
          />
        </template>
        <template v-else-if="type === 'post'">
          <!-- Aquí iría un SocialPostCard, por ahora solo muestra el contenido -->
          <div v-for="(item, index) in items" :key="index" class="border rounded p-3 bg-gray-50">
            <div class="font-semibold">{{ (item as SocialPost).user }}</div>
            <div>{{ (item as SocialPost).content }}</div>
            <div class="text-xs text-gray-500">{{ (item as SocialPost).time }}</div>
          </div>
        </template>
      </div>
      <Pagination
        v-if="showPagination"
        :page="page"
        :page-size="pageSize"
        :total="total"
        @update:page="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@/components/ui/Pagination.vue'
import { ref, watch, computed } from 'vue'
import PullRequestCard from '@/components/ui/PullRequestCard.vue'
import LucideIcon from '@/components/icons/LucideIcon.vue'
import ActivityCard from '@/components/ui/ActivityCard.vue'
import type { PullRequest } from '@/types/repo'

type MonitoringType = 'activity' | 'pullrequest' | 'post'

interface Activity {
  user: string
  content: string
  type: string
  time: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

interface SocialPost {
  user: string
  content: string
  time: string
  platform: string
}

interface Props {
  items: Activity[] | PullRequest[] | SocialPost[]
  type: MonitoringType
  sectionTitle?: string
  page?: number
  pageSize?: number
  total?: number
}

const emit = defineEmits<{ (e: 'update:page', value: number): void }>()

const props = defineProps<Props>()

const page = computed(() => props.page ?? 1)
const pageSize = computed(() => props.pageSize ?? 10)
const total = computed(() => props.total ?? 0)

const showPagination = computed(() => total.value > pageSize.value)

function onPageChange(newPage: number) {
  emit('update:page', newPage)
}
</script>
