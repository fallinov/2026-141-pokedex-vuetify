import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    isLoading: false,
    types: [],
    pokemons: [],
  }),

  getters: {
    totalPokemons: state => state.pokemons.length,

    getTypeById: state => typeId => {
      return state.types.find(type => type.id === typeId)
    },

    getPokemonById: state => pokemonId => {
      return state.pokemons.find(pokemon => pokemon.id === pokemonId)
    },
  },

  actions: {
    async init () {
      console.log('Initialisation du store Pokémon...')
      this.isLoading = true

      try {
        await Promise.all([
          this.fetchTypes({ withLoader: false }),
          this.fetchPokemons({ withLoader: false }),
        ])
        console.log('Store Pokémon initialisé')
      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchTypes ({ withLoader = true } = {}) {
      if (withLoader) this.isLoading = true

      try {
        const response = await api.get('/types')

        this.types = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des types:', error.message)
        this.types = []
      } finally {
        if (withLoader) this.isLoading = false
      }
    },

    async fetchPokemons ({ withLoader = true } = {}) {
      if (withLoader) this.isLoading = true

      try {
        const response = await api.get('/pokemons')

        this.pokemons = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des Pokémon:', error.message)
        this.pokemons = []
      } finally {
        if (withLoader) this.isLoading = false
      }
    },
  },
})
