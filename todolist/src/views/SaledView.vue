<template>
  <div id="saled-view" class="
  p-8 bg-gray-200
  h-screen w-full
  overflow-y-auto
  ">
    <h1 class="text-center">Jeux-vidéo vendus</h1>
    
    <ul class="games-sold-list
    flex flex-wrap gap-4
    mt-4
    ">
      <li @click="() => {this.$router.push('/stock/' + game.id)}"
      v-for="game in saledGames"
      :key="game.id"
      class="game
        flex flex-col justify-around
        border-2 border-gray-400 rounded-xl overflow-hidden bg-gray-800 text-gray-100 w-64
        hover:border-gray-600 hover:bg-gray-700 hover:text-gray-200
        transition-all duration-500
        ">
        <img class="
          aspect-[5/4] object-cover object-top w-fit-content p-3 rounded-2xl
          group-hover:object-bottom
          transition-all duration-500
          " :src="game.image" alt="Image de la jaquette du jeu">
          
        <p class="
          font-bold text-xl text-center px-2
          truncate
          ">{{ game.title }}</p>

        <div class="prices
          flex justify-center gap-2 my-3
          ">
          <p class="
            px-3
            bg-yellow-600
            rounded-l-xl
            ">{{ game.benefits }} €</p>
          <p class="
            px-3
            bg-green-500
            rounded-r-xl
            ">{{ game.sellPrice }} €</p>
        </div>

        <p class="
          px-3 mb-2
          text-gray-400
          self-end
          ">Vendu le {{ game.sellDate }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getGamesSold } from '@/services/games-sold'

export default {
  name: 'SaledView',

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

<style scoped>
</style>
