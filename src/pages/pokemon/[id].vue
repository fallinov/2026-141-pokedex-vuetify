<template>
  <v-container>
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
      @click="$router.back()"
    >
      Retour
    </v-btn>

    <v-alert
      v-if="!pokemon"
      type="error"
      variant="tonal"
    >
      Pokémon non trouvé.
    </v-alert>

    <v-card
      v-else
      max-width="800"
      class="mx-auto"
    >
      <v-img
        :src="getImageUrl(pokemon.img)"
        :alt="pokemon.name"
        height="300"
        cover
      />

      <v-card-title class="text-h4">
        {{ pokemon.name }}
      </v-card-title>

      <v-card-subtitle>
        Niveau {{ pokemon.level }}
      </v-card-subtitle>

      <v-card-text>
        <p
          v-if="pokemon.description"
          class="text-body-1 mb-4"
        >
          {{ pokemon.description }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { getImageUrl } from '@/utils/imageUrl'
import { usePokemonStore } from '@/stores/pokemonStore'

const route = useRoute()
const pokemonStore = usePokemonStore()

const pokemon = computed(() => {
  return pokemonStore.getPokemonById(route.params.id)
})
</script>
