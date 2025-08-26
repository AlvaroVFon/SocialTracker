<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 space-y-10">
      <h1 class="text-2xl font-bold mb-6 text-center">Demo visual RepoStatItem</h1>
      <!-- Variante 1: Actual (borde, sombra, fondo blanco) -->
      <div>
        <h2 class="font-semibold mb-2">Variante 1: Clásica (borde, sombra, fondo blanco)</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RepoStatItem label="Estrellas" :value="42" color="blue" />
          <RepoStatItem label="Forks" :value="12" color="purple" />
          <RepoStatItem label="Watchers" :value="8" color="green" />
          <RepoStatItem label="Lenguaje" :value="'TypeScript'" color="gray" />
        </div>
      </div>
      <!-- Variante 2: Fondo gris claro, sin sombra, borde sutil -->
      <div>
        <h2 class="font-semibold mb-2">Variante 2: Minimalista (fondo gris, sin sombra)</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RepoStatItem
            label="Estrellas"
            :value="42"
            color="blue"
            class="bg-gray-50 border border-gray-100 shadow-none"
          />
          <RepoStatItem
            label="Forks"
            :value="12"
            color="purple"
            class="bg-gray-50 border border-gray-100 shadow-none"
          />
          <RepoStatItem
            label="Watchers"
            :value="8"
            color="green"
            class="bg-gray-50 border border-gray-100 shadow-none"
          />
          <RepoStatItem
            label="Lenguaje"
            :value="'TypeScript'"
            color="gray"
            class="bg-gray-50 border border-gray-100 shadow-none"
          />
        </div>
      </div>
      <!-- Variante 3: Sin borde, fondo azul claro, texto blanco -->
      <div>
        <h2 class="font-semibold mb-2">Variante 3: Colorida (fondo azul, texto blanco)</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RepoStatItem
            label="Estrellas"
            :value="42"
            color="blue"
            class="bg-blue-500 text-white border-0 shadow"
          />
          <RepoStatItem
            label="Forks"
            :value="12"
            color="purple"
            class="bg-purple-500 text-white border-0 shadow"
          />
          <RepoStatItem
            label="Watchers"
            :value="8"
            color="green"
            class="bg-green-500 text-white border-0 shadow"
          />
          <RepoStatItem
            label="Lenguaje"
            :value="'TypeScript'"
            color="gray"
            class="bg-gray-700 text-white border-0 shadow"
          />
        </div>
      </div>
      <!-- Variante 4: Sin fondo, solo texto y borde inferior -->
      <div>
        <h2 class="font-semibold mb-2">Variante 4: Solo texto y borde inferior</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <RepoStatItem
            label="Estrellas"
            :value="42"
            color="blue"
            class="bg-transparent border-0 shadow-none border-b-2 border-blue-200"
          />
          <RepoStatItem
            label="Forks"
            :value="12"
            color="purple"
            class="bg-transparent border-0 shadow-none border-b-2 border-purple-200"
          />
          <RepoStatItem
            label="Watchers"
            :value="8"
            color="green"
            class="bg-transparent border-0 shadow-none border-b-2 border-green-200"
          />
          <RepoStatItem
            label="Lenguaje"
            :value="'TypeScript'"
            color="gray"
            class="bg-transparent border-0 shadow-none border-b-2 border-gray-300"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Tarjetas resumen con toda la info -->
  <div>
    <h2 class="font-semibold mb-2 mt-10">Tarjeta resumen 1: Clásica</h2>
    <div
      class="bg-white border border-gray-200 rounded-xl shadow p-6 flex flex-col gap-2 w-full max-w-md mx-auto"
    >
      <div class="flex items-center gap-2 mb-2">
        <span class="font-semibold text-lg text-gray-900 truncate">ejemplo-repo</span>
        <a href="#" class="ml-auto text-blue-500 hover:underline text-xs">Ver en GitHub</a>
      </div>
      <p class="text-gray-600 text-xs mb-2">
        Repositorio de ejemplo para mostrar el diseño de la tarjeta resumen.
      </p>
      <div class="flex flex-wrap gap-4 text-xs text-gray-700 mb-2">
        <span class="bg-gray-100 rounded px-2 py-0.5">TypeScript</span>
        <span>⭐ 42</span>
        <span>👁️ 10</span>
        <span>🍴 5</span>
      </div>
      <div class="flex gap-4 text-xs text-gray-700 mt-2">
        <span><span class="font-semibold text-gray-800">Total vistas:</span> 1234</span>
        <span><span class="font-semibold text-gray-800">Total clones:</span> 56</span>
      </div>
      <div class="flex justify-between items-center mt-2 text-xs text-gray-300">
        <span>Creado: 2024-01-01</span>
        <a href="#" class="text-blue-500 hover:underline">Estadísticas</a>
      </div>
    </div>
  </div>

  <div>
    <h2 class="font-semibold mb-2 mt-10">Tarjeta resumen 2: Minimalista</h2>
    <div
      class="bg-gray-50 border border-gray-100 rounded-lg p-5 flex flex-col gap-1 w-full max-w-md mx-auto"
    >
      <div class="flex items-center gap-2">
        <span class="font-medium text-base text-gray-900 truncate">ejemplo-repo</span>
        <a href="#" class="ml-auto text-blue-600 hover:underline text-xs">Ver en GitHub</a>
      </div>
      <p class="text-gray-500 text-xs">
        Repositorio de ejemplo para mostrar el diseño de la tarjeta resumen.
      </p>
      <div class="flex gap-2 text-xs text-gray-500 mt-1">
        <span>TypeScript</span>
        <span>·</span>
        <span>⭐ 42</span>
        <span>· 👁️ 10</span>
        <span>· 🍴 5</span>
      </div>
      <div class="flex gap-4 text-xs text-gray-700 mt-1">
        <span><b>Total vistas:</b> 1234</span>
        <span><b>Total clones:</b> 56</span>
      </div>
      <div class="flex justify-between items-center mt-2 text-xs text-gray-300">
        <span>Creado: 2024-01-01</span>
        <a href="#" class="text-blue-500 hover:underline">Estadísticas</a>
      </div>
    </div>
  </div>

  <div>
    <h2 class="font-semibold mb-2 mt-10">Tarjeta resumen 3: Colorida</h2>
    <div
      class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow p-6 flex flex-col gap-2 w-full max-w-md mx-auto"
    >
      <div class="flex items-center gap-2 mb-2">
        <span class="font-semibold text-lg text-blue-900 truncate">ejemplo-repo</span>
        <a href="#" class="ml-auto text-blue-700 hover:underline text-xs">Ver en GitHub</a>
      </div>
      <p class="text-blue-900/80 text-xs mb-2">
        Repositorio de ejemplo para mostrar el diseño de la tarjeta resumen.
      </p>
      <div class="flex flex-wrap gap-2 text-xs text-blue-800 mb-2">
        <span class="bg-white/80 rounded px-2 py-0.5">TypeScript</span>
        <span>⭐ 42</span>
        <span>👁️ 10</span>
        <span>🍴 5</span>
      </div>
      <div class="flex gap-4 text-xs text-blue-900 mt-2">
        <span><span class="font-semibold">Total vistas:</span> 1234</span>
        <span><span class="font-semibold">Total clones:</span> 56</span>
      </div>
      <div class="flex justify-between items-center mt-2 text-xs text-blue-400">
        <span>Creado: 2024-01-01</span>
        <a href="#" class="text-blue-700 hover:underline">Estadísticas</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RepoStatItem from '@/components/ui/repostats/RepoStatItem.vue'
</script>
