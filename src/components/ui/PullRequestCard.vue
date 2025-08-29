<template>
  <div class="pr-card flex items-center gap-4 border border-gray-300 rounded-xl p-4 bg-white shadow-sm">
    <img
      :src="pullRequest.author_avatar_url"
      alt="avatar"
      class="w-10 h-10 rounded-full border border-gray-200 object-cover"
    />
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <LucideIcon
          :name="
            pullRequest.state === 'open'
              ? 'git-pull-request-arrow'
              : pullRequest.state === 'merged'
                ? 'git-merge'
                : 'git-pull-request-closed'
          "
          :color="
            pullRequest.state === 'open'
              ? '#22c55e'
              : pullRequest.state === 'merged'
                ? '#6366f1'
                : '#ef4444'
          "
          :size="20"
          class="shrink-0"
        />
        <span class="font-semibold text-base text-black truncate">{{ pullRequest.title }}</span>
        <span class="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{{
          pullRequest.state
        }}</span>
      </div>
      <div class="text-xs text-gray-600 mb-1" v-if="pullRequest.repo_name">
        <p class="font-mono"><span class="font-bold">Repo: </span> {{ pullRequest.repo_name }}</p>
      </div>
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <span class="font-medium text-black">{{ pullRequest.author_name }}</span>
        <span>•</span>
        <span>{{ pullRequest.created_at }}</span>
        <span>•</span>
        <a :href="pullRequest.url" target="_blank" class="text-blue-500 hover:underline"
          >Ver en GitHub</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'
import type { PullRequest } from '@/types/repo'

defineProps<{ pullRequest: PullRequest }>()
</script>
