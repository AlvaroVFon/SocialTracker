<template>
  <component
    :is="iconComponent"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :absolute-stroke-width="absoluteStrokeWidth"
    :class="iconClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

interface Props {
  name: string
  size?: number | string
  color?: string
  absoluteStrokeWidth?: boolean
  class?: string | string[] | Record<string, boolean>
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  class: '',
})

const iconName = computed(() => {
  if (!props.name) return ''

  if (props.name[0] === props.name[0].toUpperCase()) {
    return props.name
  }

  return props.name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
})

const iconComponent = computed((): Component | null => {
  if (!iconName.value) return null

  const component = (LucideIcons as any)[iconName.value]

  if (!component) {
    console.warn(
      `Icono "${iconName.value}" no encontrado en Lucide. Iconos disponibles:`,
      Object.keys(LucideIcons)
        .filter((key) => key !== 'Icon')
        .slice(0, 10),
    )
    return null
  }

  return component
})

const iconClasses = computed(() => {
  const classes = ['lucide-icon']

  if (props.class) {
    if (typeof props.class === 'string') {
      classes.push(props.class)
    } else if (Array.isArray(props.class)) {
      classes.push(...props.class)
    } else {
      Object.entries(props.class).forEach(([className, condition]) => {
        if (condition) classes.push(className)
      })
    }
  }

  return classes
})
</script>

<style scoped>
.lucide-icon {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;
}

/* Clase de utilidad para efectos hover */
.lucide-icon.hover-scale:hover {
  transform: scale(1.1);
}

.lucide-icon.hover-rotate:hover {
  transform: rotate(15deg);
}

.lucide-icon.hover-color:hover {
  color: var(--hover-color, #3b82f6);
}
</style>
