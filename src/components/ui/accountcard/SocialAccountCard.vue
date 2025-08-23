<template>
  <div class="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row gap-6 items-center">
    <img
      :src="avatarUrl"
      :alt="username + ' avatar'"
      class="w-24 h-24 rounded-full border-2 border-gray-200 object-cover"
    />
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-xl font-bold text-gray-900">{{ name }}</span>
        <span class="text-gray-500 text-base">@{{ username }}</span>
        <LucideIcon v-if="iconName" :name="iconName" :color="iconColor" class="w-5 h-5 ml-2" />
      </div>
      <p class="text-gray-700 mb-2" v-if="bio">{{ bio }}</p>
      <div class="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
        <AccountInfoItem v-if="company" icon="Building" iconClass="w-4 h-4 mr-1 text-gray-400 inline">{{ company }}</AccountInfoItem>
        <AccountInfoItem v-if="location" icon="MapPin" iconClass="w-4 h-4 mr-1 text-gray-400 inline">{{ location }}</AccountInfoItem>
      </div>
      <div class="flex gap-6 text-sm text-gray-600 mb-2">
        <AccountInfoItem v-if="public_repos !== undefined"> <b>{{ public_repos }}</b> repos </AccountInfoItem>
        <AccountInfoItem v-if="followers !== undefined"> <b>{{ followers }}</b> followers </AccountInfoItem>
        <AccountInfoItem v-if="following !== undefined"> <b>{{ following }}</b> following </AccountInfoItem>
      </div>
      <div class="text-xs text-gray-400" v-if="created_at">Miembro desde {{ created_at }}</div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'
import AccountInfoItem from '@/components/ui/accountcard/AccountInfoItem.vue'

interface Props {
  username: string
  name?: string
  avatarUrl: string
  iconName?: string
  iconColor?: string
  bio?: string
  company?: string
  location?: string
  public_repos?: number
  followers?: number
  following?: number
  created_at?: string
}

defineProps<Props>()
</script>
