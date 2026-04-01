<template>
  <v-app>
    <app-header />
    <v-main>
      <router-view />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

import { usePokemonStore } from '@/stores/pokemonStore'

onMounted(async () => {
  const pokemonStore = usePokemonStore()
  await pokemonStore.init()
})
</script>
