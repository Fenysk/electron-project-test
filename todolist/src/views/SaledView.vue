<template>
    <div id="stock-view">
        <h2>Jeux-vidéo vendus</h2>
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
      console.log(this.saledGames)
    }
  },

  mounted() {
    this.getSaledGames()
  }
}
</script>

<style scoped>

</style>