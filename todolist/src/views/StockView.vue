<template>
  <div id="stock-view" class="
  p-8 bg-gray-100
  h-screen w-full
  ">
    <h2 class="text-center">Jeux-vidéo en stock</h2>

    <form @submit.prevent="postGame(newGameToStockForm)" class="flex flex-col items-center">
      <div class="grid grid-cols-4 gap-3 items-center">
        <label class="text-right">Titre</label>
        <input type="text" v-model="newGameToStockForm.title" placeholder="Nom du jeu" />

        <label class="text-right">Image</label>
        <input type="text" v-model="newGameToStockForm.image" placeholder="URL de l'image" />

        <label class="text-right">Plateforme</label>
        <input type="text" v-model="newGameToStockForm.platform" placeholder="Plateforme" />

        <label class="text-right">Edition</label>
        <input type="text" v-model="newGameToStockForm.edition" placeholder="Édition" />

        <label class="text-right">État</label>
        <input type="text" v-model="newGameToStockForm.state" placeholder="État" />

        <label class="text-right">Contenu</label>
        <input type="text" v-model="newGameToStockForm.contents" placeholder="Contenu" />

        <label class="text-right">Prix d'achat</label>
        <input type="number" v-model="newGameToStockForm.buyPrice" placeholder="Prix d'achat" />

        <label class="text-right">Prix estimé</label>
        <input type="number" v-model="newGameToStockForm.potentialSellPrice" placeholder="Prix de vente potentiel" />

        <label class="text-right">Informations complémentaires</label>
        <input type="text" v-model="newGameToStockForm.additonalInfos" placeholder="Informations supplémentaires" />
      </div>

      <button type="submit">Ajouter</button>
    </form>

    <ul class="games-list
    flex flex-wrap gap-4
    mt-4
    ">
      <GameMiniature :game="game" v-for="game in games" :key="game.id" />
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { getGames, postGame } from '@/services/games'
import GameMiniature from '@/components/GameMiniature'

export default {
  name: 'StockView',

  components: {
    GameMiniature
  },

  data() {
    return {
      games: [],
      newGameToStockForm: {
        title: 'Super Smash Bros. Ultimate',
        image: 'https://mario.wiki.gallery/images/thumb/f/fc/SSB_Ultimate_box_art.png/400px-SSB_Ultimate_box_art.png',
        platform: 'Nintendo Switch',
        edition: 'Standard',
        state: 'Neuf',
        contents: ['Jeu', 'Boîte', 'Notice'],
        buyPrice: 20,
        potentialSellPrice: 40,
        potentialBenefits: 20,
        buyDate: '2021-01-01',
        additonalInfos: ''
      }
    }
  },

  methods: {
    async getGames() {
      const games = await getGames()
      games.forEach(game => {
        game.buyDate = new Date(game.buyDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
      })
      this.games = games
    },

    async postGame(game) {
      game.id = uuidv4()
      game.buyDate = new Date(game.buyDate)
      game.potentialBenefits = game.potentialSellPrice - game.buyPrice
      console.log(game)
      await postGame(game)
      this.getGames()
    }
  },

  created() {
    this.getGames()
  },
}
</script>