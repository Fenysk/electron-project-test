<template>
  <div id="saled-view" class="
  w-full h-screen overflow-y-auto
  bg-gray-200
  ">
    <h1 class="text-center">Jeux-vidéo vendus</h1>

    <ul class="games-sold-list
    px-2 md:px-6 lg:px-12 2xl:px-32
    grid grid-cols-1 xl:grid-cols-2
    gap-4 mt-8
    ">
      <SoldGameMiniature v-for="game in saledGames" :key="game.id" :game="game"
      @delete-game="deleteGame" />
    </ul>

    <h2 class="text-center" v-if="isLoaded">Chargement en cours...</h2>
  </div>
</template>

<script>
import { getGamesSold } from '@/services/games-sold'
import { deleteGameStock } from '@/services/games-stock'
import SoldGameMiniature from '@/components/SoldGameMiniature'

export default {
  name: 'SoldView',

  components: {
    SoldGameMiniature
  },

  data() {
    return {
      saledGames: [],
      isLoaded: false
    }
  },

  methods: {
    async getSaledGames() {
      this.isLoaded = true
      this.saledGames = await getGamesSold()
      this.saledGames.forEach(game => {
        game.sellDate = new Date(game.sellDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
        game.benefits = game.sellPrice - game.buyPrice
      })
      console.log(this.saledGames)
      this.isLoaded = false
    },

    async deleteGame(id) {
      this.isLoaded = true
      await deleteGameStock(id)
      this.getSaledGames()
      this.isLoaded = false
    }
  },

  created() {
    this.getSaledGames()
  }
}
</script>

<style scoped></style>
