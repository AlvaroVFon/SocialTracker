<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <slot name="main" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <slot name="totals" />
    </div>
  </div>
</template>
