<template>
  <div class="mb-4 sm:mb-8 rounded-lg bg-white p-3 sm:p-6 shadow">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center">
        <LucideIcon
          :name="platform.iconName"
          :size="28"
          :color="platform.iconColor"
          class="mr-3 sm:mr-4 text-gray-900"
        />
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
            {{ platform.label }} Analytics
          </h1>
          <p class="text-gray-600 text-sm sm:text-base">
            Monitoreo y análisis completo de {{ platform.label }}
          </p>
        </div>
      </div>
      <nav v-if="sections && sections.length" class="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 pb-1 min-w-0 w-full sm:w-auto">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="scrollToSection(section.id)"
          class="px-2 sm:px-3 py-1 sm:py-2 text-[11px] sm:text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-0 flex items-center"
          :class="[
            activeSection === section.id
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-700 hover:text-gray-900',
          ]"
          tabindex="0"
          style="line-height: 1.1"
        >
          <LucideIcon
            :name="section.icon"
            :size="13"
            :class="'mr-1 sm:mr-2 shrink-0 sm:w-5 sm:h-5'"
          />
          <span class="truncate">{{ section.label }}</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import LucideIcon from '@/components/icons/LucideIcon.vue'
import type { Section } from '@/config/navigation'
import type { Platform } from '@/types/platform'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  platform: Platform
  activeSection?: string
  sections?: Section[]
}>()

const emit = defineEmits<{
  (e: 'update:activeSection', sectionId: string): void
}>()

function scrollToSection(sectionId: string) {
  emit('update:activeSection', sectionId)
  // Esperar a que el DOM actualice la sección visible
  setTimeout(() => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 50)
}
</script>
