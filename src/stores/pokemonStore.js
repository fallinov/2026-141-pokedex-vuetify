import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    // données ici
    pokemons: [],
    types: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    // Retourne le nombre de pokémons
    totalPokemons: (state) => state.pokemons.length,
    // Retourne le pokémon correspondant à l'id en paramètre
    getPokemonById: (state) => {
      return (pokemonId) => {
        return state.pokemons.find(p => p.id === pokemonId)
      }
    },
  },
  actions: {
    // Récupérer les pokémons
    async fetchPokemons() {
      const reponse = await fetch('http://localhost:3535/pokemons')
      // Si erreur on s'arrête et affiche erreur
      if(!reponse.ok) {
        throw new Error(`Erreur HTTP : ${reponse.status}`)
      }
      // Transforme le JSON en JS et le stocke dans le magasin
      this.pokemons = await reponse.json()
    },
    // Récupère les types de pokémons
    async fetchTypes() {
      const reponse = await fetch('http://localhost:3535/types')
      // Si erreur on s'arrête et affiche erreur
      if(!reponse.ok) {
        throw new Error(`Erreur HTTP : ${reponse.status}`)
      }
      // Transforme le JSON en JS et le stocke dans le magasin
      this.types = await reponse.json()
    },
    // Initialise les données du magasin depuis API
    async init() {
      this.isLoading = true
      try {
        // Permet de lancer les fetch en paralèlle
        await Promise.all([
          this.fetchPokemons(),
          this.fetchTypes(),
        ])
      } catch (error) {
        this.error = 'Erreur lors du chargement des données'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
