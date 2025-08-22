<template>
  <div class="flex items-center justify-between py-4 border-b border-gray-200">
    <div>
      <p class="text-sm font-medium text-gray-900">{{ title }}</p>
      <p class="text-sm text-gray-500">{{ description }}</p>
    </div>
    <button
      @click="handleToggle"
      class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      :class="isEnabled ? 'bg-blue-600' : 'bg-gray-200'"
    >
      <span
        class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
        :class="isEnabled ? 'translate-x-5' : 'translate-x-0'"
      ></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
  description: string
  defaultEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultEnabled: false
})

const isEnabled = ref(props.defaultEnabled)

const handleToggle = () => {
  isEnabled.value = !isEnabled.value
}
</script>
