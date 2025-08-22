<template>
  <SocialPlatformLayout :platform="twitterPlatform" />
</template>

<script setup lang="ts">
import SocialPlatformLayout from '@/components/SocialPlatformLayout.vue'

const twitterPlatform = {
  name: 'twitter',
  label: 'Twitter',
  iconName: 'twitter',
  iconColor: '#1DA1F2',
}
</script>

<style scoped>
/* Estilos específicos de Twitter */
</style>
