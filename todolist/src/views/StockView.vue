<template>
  <div id="stock-view" class="
  p-8 bg-gray-100
  h-screen w-full
  ">
    <h2 class="text-center">Jeux-vidéo en stock</h2>

    <header class="px-8 py-4 flex justify-between items-center
    bg-gray-800 text-gray-100 rounded-md
    mb-8
    ">
      <button type="button" @click="openCreateModal = !openCreateModal">{{ openCreateModal ? 'Retour' : 'Ajouter un jeu'
      }}</button>
    </header>

    <div class="modal" v-if="openCreateModal">
      <form @submit.prevent="postGame(newGameToStockForm)" class="flex flex-col items-center">

        <div class="flex flex-col gap-3 items-center">

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">Titre</label>
            <input type="text" v-model="newGameToStockForm.title" placeholder="Nom du jeu" />
          </div>

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">Image</label>
            <input type="text" v-model="newGameToStockForm.image" placeholder="URL de l'image" />
          </div>

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">Plateforme</label>
            <select v-model="newGameToStockForm.platform">
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="PlayStation 4">PlayStation 4</option>
              <option value="PlayStation 5">PlayStation 5</option>
              <option value="Xbox One">Xbox One / Series</option>
              <option value="PC">PC</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">Edition</label>
            <input type="text" v-model="newGameToStockForm.edition" placeholder="Édition" />
          </div>

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">État</label>
            <input type="text" v-model="newGameToStockForm.state" placeholder="État" />
          </div>

          <div class="w-full">
            <div class="flex items-center gap-4 w-full">
              <label class="text-right basis-1/3">Contenu</label>
              <input type="text" v-model="newGameToStockForm.content" placeholder="Contenu" />
              <button type="button" @click="addContent">Ajouter</button>
            </div>
            <ul class="flex justify-center gap-1">
              <li v-for="content in newGameToStockForm.contents"
              :key="content"
              class="px-4 py-2 border-2 border-gray-400 rounded-md mt-2 relative cursor-pointer"
              @click="removeContent(content)"
              >
                {{ content }}
              </li>
            </ul>
          </div>

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">Prix d'achat</label>
            <input type="number" v-model="newGameToStockForm.buyPrice" placeholder="Prix d'achat" />
          </div>

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">Prix estimé</label>
            <input type="number" v-model="newGameToStockForm.potentialSellPrice" placeholder="Prix de vente potentiel" />
          </div>

          <div class="flex items-center gap-4 w-full">
            <label class="text-right basis-1/3">Informations complémentaires</label>
            <input type="text" v-model="newGameToStockForm.additonalInfos" placeholder="Informations supplémentaires" />
          </div>
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>

    <ul v-if="!openCreateModal" class="games-list
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
      openCreateModal: false,
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

    addContent() {
      this.newGameToStockForm.contents.push(this.newGameToStockForm.content)
      this.newGameToStockForm.content = ''
    },
    
    removeContent(content) {
      this.newGameToStockForm.contents = this.newGameToStockForm.contents.filter(c => c !== content)
    },

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
      this.openCreateModal = false
    },
  },

  created() {
    this.getGames()
  },
}
</script>