<template>
  <SocialPlatformLayout :platform="linkedinPlatform" />
</template>

<script setup lang="ts">
import SocialPlatformLayout from '@/layouts/SocialPlatformLayout.vue'

const linkedinPlatform = {
  name: 'linkedin',
  label: 'LinkedIn',
  iconName: 'linkedin',
  iconColor: '#0A66C2',
}
</script>

<style scoped>
/* Estilos específicos de LinkedIn */
</style>
