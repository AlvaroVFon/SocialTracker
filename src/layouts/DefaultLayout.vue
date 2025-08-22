<script lang="ts" setup>
import DefaultHeader from '@/components/DefaultHeader.vue'
import TabNavigation from '@/components/TabNavigation.vue'
import { navigationTabs } from '@/config/navigation'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <DefaultHeader title="SocialTracker" />

    <!-- Tab Navigation -->
    <TabNavigation :tabs="navigationTabs" />

    <!-- Main Content -->
    <main>
      <router-view />
    </main>
  </div>
</template>
