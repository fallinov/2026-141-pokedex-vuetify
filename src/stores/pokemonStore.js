import { defineStore } from 'pinia'

/**
 * Store Pinia pour gérer les données des Pokémon.
 * Centralise les appels API et partage les données entre les pages.
 */
export const usePokemonStore = defineStore('pokemon', {
  /**
   * State — les données brutes du store.
   */
  state: () => ({
    pokemons: [],
    types: [],
    isLoading: false,
    error: null,
  }),

  /**
   * Getters — propriétés calculées basées sur le state.
   */
  getters: {
    totalPokemons: (state) => {
      return state.pokemons.length
    },

    getPokemonById: (state) => {
      return (pokemonId) => {
        return state.pokemons.find(pokemon => pokemon.id === pokemonId)
      }
    },
  },

  /**
   * Actions — méthodes qui modifient le state.
   */
  actions: {
    async fetchPokemons() {
      const response = await fetch('http://localhost:3535/pokemons')

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }

      this.pokemons = await response.json()
      console.log('Pokémon chargés :', this.pokemons.length)
    },

    async fetchTypes() {
      const response = await fetch('http://localhost:3535/types')

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`)
      }

      this.types = await response.json()
      console.log('Types chargés :', this.types.length)
    },

    async init() {
      console.log('Initialisation du store Pokémon...')

      this.isLoading = true
      this.error = null

      try {
        await Promise.all([
          this.fetchPokemons(),
          this.fetchTypes(),
        ])

        console.log('Store Pokémon initialisé')
      } catch (error) {
        this.error = 'Erreur lors du chargement des données'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
