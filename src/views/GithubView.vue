<template>
  <SocialPlatformLayout :platform="githubPlatform" />
</template>

<script setup lang="ts">
import SocialPlatformLayout from '@/layouts/SocialPlatformLayout.vue'

const githubPlatform = {
  name: 'github',
  label: 'GitHub',
  iconName: 'github',
  iconColor: '#181717',
}
</script>
