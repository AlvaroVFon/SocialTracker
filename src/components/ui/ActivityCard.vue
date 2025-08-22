<template>
  <div class="border border-gray-200 rounded-lg p-4">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-gray-900">{{ activity.user }}</p>
        <p class="mt-1 text-sm text-gray-600">{{ activity.content }}</p>
        <p class="mt-1 text-xs text-gray-500">
          {{ activity.type }} • {{ activity.time }}
        </p>
      </div>
      <span
        class="px-2 py-1 text-xs font-medium rounded-full"
        :class="sentimentClass"
      >
        {{ activity.sentiment }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Activity {
  user: string
  content: string
  type: string
  time: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

interface Props {
  activity: Activity
}

const props = defineProps<Props>()

const sentimentClass = computed(() => {
  switch (props.activity.sentiment) {
    case 'positive':
      return 'bg-green-100 text-green-800'
    case 'negative':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})
</script>
