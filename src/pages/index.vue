<template>
  <v-container>
    <h1 class="text-h3 text-center my-6">
      Pokédex
    </h1>

    <v-row>
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
const { pokemons } = storeToRefs(pokemonStore)
</script>
