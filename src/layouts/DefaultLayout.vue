<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultHeader from '@/components/DefaultHeader.vue'
import TabNavigation from '@/components/TabNavigation.vue'
import { navigationTabs } from '@/config/navigation'

const route = useRoute()
const showTabs = computed(() => {
  const allowed = ['GitHub', 'LinkedIn', 'Twitter', 'Instagram']
  return allowed.includes(String(route.name))
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <DefaultHeader title="SocialTracker" />

    <!-- Tab Navigation (only on main) -->
    <TabNavigation v-if="showTabs" :tabs="navigationTabs" />

    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>
