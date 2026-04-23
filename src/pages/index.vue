<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Pokédex
    </h1>

    <!-- État 1 : Chargement -->

    <v-row v-if="isLoading">
      <v-col
        v-for="x in 8"
        :key="x"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-skeleton-loader
          type="card"
        />
      </v-col>
    </v-row>

    <!-- État 2 : Erreur -->
    <v-alert
      v-else-if="error"
      type="error"
    >
      Chargement impossible pour le moment !
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { usePokemonStore } from '@/stores/pokemonStore'
import { storeToRefs } from 'pinia'
import PokemonCard from '@/components/PokemonCard.vue'

const pokemonStore = usePokemonStore()
const { pokemons, isLoading, error } = storeToRefs(pokemonStore)
</script>
