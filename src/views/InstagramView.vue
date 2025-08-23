<template>
  <SocialPlatformLayout :platform="instagramPlatform" />
</template>

<script setup lang="ts">
import SocialPlatformLayout from '@/layouts/SocialPlatformLayout.vue'

const instagramPlatform = {
  name: 'instagram',
  label: 'Instagram',
  iconName: 'instagram',
  iconColor: '#C13584',
}
</script>
