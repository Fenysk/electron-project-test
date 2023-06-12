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
      <SoldGameMiniature v-for="game in saledGames" :key="game.id" :game="game" />
    </ul>
  </div>
</template>

<script>
import { getGamesSold } from '@/services/games-sold'
import SoldGameMiniature from '@/components/SoldGameMiniature'

export default {
  name: 'SoldView',

  components: {
    SoldGameMiniature
  },

  data() {
    return {
      saledGames: []
    }
  },

  methods: {
    async getSaledGames() {
      this.saledGames = await getGamesSold()
      this.saledGames.forEach(game => {
        game.sellDate = new Date(game.sellDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
        game.benefits = game.sellPrice - game.buyPrice
      })
      console.log(this.saledGames)
    }
  },

  created() {
    this.getSaledGames()
  }
}
</script>

<style scoped></style>
