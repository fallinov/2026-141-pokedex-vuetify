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

        if (response.data && response.data.data) {
          this.types = response.data.data
        } else if (response.data) {
          this.types = response.data
        } else {
          this.types = []
        }
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

        if (response.data && response.data.data) {
          this.pokemons = response.data.data
        } else if (response.data) {
          this.pokemons = response.data
        } else {
          this.pokemons = []
        }
      } catch (error) {
        console.error('Erreur lors du chargement des Pokémon:', error.message)
        this.pokemons = []
      } finally {
        if (withLoader) this.isLoading = false
      }
    },
  },
})
