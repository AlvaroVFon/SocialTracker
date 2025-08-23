<template>
  <div
    class="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center sm:items-start"
  >
    <img
      :src="avatar_url"
      :alt="username + ' avatar'"
      class="hidden sm:block w-24 h-24 rounded-full border-2 border-gray-200 object-cover mb-0 sm:mb-0 mx-0"
    />
    <div class="flex-1 min-w-0 w-full">
      <div
        class="flex flex-row sm:flex-row gap-1 sm:gap-2 mb-1 items-center sm:items-baseline text-center sm:text-left justify-center sm:justify-start"
      >
        <span class="text-base sm:text-xl font-bold text-gray-900">{{ name }}</span>
        <span class="text-gray-500 text-xs sm:text-base">@{{ username }}</span>
      </div>
      <p class="text-gray-700 mb-2 text-xs sm:text-base text-center sm:text-left" v-if="bio">
        {{ bio }}
      </p>
      <div
        class="flex flex-wrap justify-center sm:justify-start gap-1.5 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-2"
      >
        <AccountInfoItem
          v-if="company"
          icon="Building"
          iconClass="w-4 h-4 mr-1 text-gray-400 inline"
          >{{ company }}</AccountInfoItem
        >
        <AccountInfoItem
          v-if="location"
          icon="MapPin"
          iconClass="w-4 h-4 mr-1 text-gray-400 inline"
          >{{ location }}</AccountInfoItem
        >
      </div>
      <div
        class="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-2"
      >
        <AccountInfoItem v-if="public_repos !== undefined">
          <b>{{ public_repos }}</b> repos
        </AccountInfoItem>
        <AccountInfoItem v-if="followers !== undefined">
          <b>{{ followers }}</b> followers
        </AccountInfoItem>
        <AccountInfoItem v-if="following !== undefined">
          <b>{{ following }}</b> following
        </AccountInfoItem>
      </div>
      <div class="text-xs text-gray-400 text-center sm:text-left" v-if="created_at">
        Miembro desde {{ formatDate(created_at) }}
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

import AccountInfoItem from '@/components/ui/accountcard/AccountInfoItem.vue'
import { formatDate } from '@/utils/formatDate'


interface Props {
  username: string
  name?: string
  avatar_url: string
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
