<template>
  <SocialPlatformLayout :platform="githubPlatform" />
</template>

<script setup lang="ts">
import SocialPlatformLayout from '@/components/SocialPlatformLayout.vue'

const githubPlatform = {
  name: 'github',
  label: 'GitHub',
  iconName: 'github',
}
</script>

<style scoped>
/* Estilos específicos de GitHub */
</style>
