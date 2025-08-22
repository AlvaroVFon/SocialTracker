<template>
  <SocialPlatformLayout :platform="instagramPlatform" />
</template>

<script setup lang="ts">
import SocialPlatformLayout from '@/components/SocialPlatformLayout.vue'

const instagramPlatform = {
  name: 'instagram',
  label: 'Instagram',
  iconName: 'instagram',
}
</script>

<style scoped>
/* Estilos específicos de Instagram */
</style>
