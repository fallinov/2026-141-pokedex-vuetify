<template>
  <v-card
    :to="`/pokemon/${pokemon.id}`"
    hover
  >
    <v-img
      :src="getImageUrl(pokemon.img + 'toto')"
      :alt="pokemon.name"
      height="200"
      cover
    >
      <template #error>
        <v-img
          :src="getImageUrl('pikachu.png')"
          alt="Erreur de chargement"
          height="200"
          cover
        />
      </template>
    </v-img>
    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-subtitle>Niveau {{ pokemon.level }}</v-card-subtitle>
  </v-card>
</template>

<script setup>
import { getImageUrl } from '@/utils/imageUrl'

defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})
</script>
