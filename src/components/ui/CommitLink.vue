<template>
  <router-link
    v-if="prNumber"
    :to="to"
    class="absolute top-2 right-2 text-xs text-blue-500 hover:underline bg-white/80 px-2 py-1"
    title="Ver commits de la PR"
  >
    <LucideIcon name="git-commit" class="inline w-4 h-4 mr-1" />
    commits
  </router-link>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
  prNumber: number | string | undefined
  basePath?: string
}>()

const to = computed(() => {
  if (!props.prNumber) return '#'
  return `${props.basePath || 'github/pr'}/${props.prNumber}/commits`
})
</script>
