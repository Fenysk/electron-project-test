<template>
  <div id="stock-view" class="
  p-8 bg-gray-200
  h-screen w-full
  overflow-y-auto
  ">
    <h2 class="text-center">Jeux-vidéo en stock</h2>

    <header class="px-8 py-4 flex justify-between items-center
    bg-gray-800 text-gray-100 rounded-md
    mb-8
    ">
      <button type="button" @click="openCreateModal = !openCreateModal">{{ openCreateModal ? 'Retour' : 'Ajouter un jeu'
      }}</button>
    </header>

    <div class="modal flex items-center" v-if="openCreateModal">
      <form @submit.prevent="postGame(newGameToStockForm)"
        class="game border-2 border-gray-400 rounded-2xl bg-gray-800 text-white px-12 py-8 w-fit mx-auto overflow-hidden flex flex-col gap-8">
        <h2 class="text-3xl font-bold mb-8">Ajouter un jeu</h2>
        <div class="informations flex flex-col gap-4">

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">Titre</label>
            <input type="text" v-model="newGameToStockForm.title" placeholder="Nom du jeu"
              class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3" />
          </div>

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">Image</label>
            <input type="text" v-model="newGameToStockForm.image" placeholder="URL de l'image"
              class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3" />
          </div>

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">Plateforme</label>
            <select v-model="newGameToStockForm.platform"
            class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3">
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="PlayStation 4">PlayStation 4</option>
              <option value="PlayStation 5">PlayStation 5</option>
              <option value="Xbox One">Xbox One / Series</option>
              <option value="PC">PC</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">Edition</label>
            <input type="text" v-model="newGameToStockForm.edition" placeholder="Édition"
              class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3" />
          </div>

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">État</label>
            <select v-model="newGameToStockForm.state" class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3">
              <option value="Neuf">Neuf</option>
              <option value="Très bon état">Très bon état</option>
              <option value="Bon état">Bon état</option>
              <option value="Moyen">Moyen</option>
              <option value="Mauvais">Mauvais</option>
              <option value="Mauvais">Pour pièces</option>
            </select>
          </div>

          <div class="w-full">
            <div class="flex gap-4 items-center w-full">
              <label class="text-right w-1/3">Contenu</label>
              <input type="text" v-model="newGameToStockForm.content" placeholder="Contenu"
                class="rounded-md bg-gray-200 text-black px-2 py-1 w-1/3" />
              <button type="button" @click="addContent"
                class="bg-green-100 text-gray-800 border-none px-2 py-1 rounded-md text-sm font-bold transition duration-200 hover:bg-green-300">Ajouter</button>
            </div>
            <ul class="flex justify-center gap-1 mt-2">
              <li v-for="content in newGameToStockForm.contents" :key="content"
                class="px-4 py-2 rounded-md relative cursor-pointer text-sm bg-gray-200 text-black hover:scale-90 hover:bg-red-300 transition duration-200"
                @click="removeContent(content)">
                {{ content }}
              </li>
            </ul>
          </div>

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">Prix d'achat</label>
            <input type="number" v-model="newGameToStockForm.buyPrice" placeholder="Prix d'achat"
              class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3" />
          </div>

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">Prix estimé</label>
            <input type="number" v-model="newGameToStockForm.potentialSellPrice" placeholder="Prix de vente potentiel"
              class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3" />
          </div>

          <div class="flex gap-4 items-center w-full">
            <label class="text-right w-1/3">Informations complémentaires</label>
            <input type="text" v-model="newGameToStockForm.additonalInfos" placeholder="Informations supplémentaires"
              class="rounded-md bg-gray-200 text-black px-2 py-1 w-2/3" />
          </div>
        </div>

        <button type="submit"
          class="bg-green-100 text-gray-800 border-none px-8 py-2 rounded-md text-xl font-bold transition duration-200 hover:bg-green-300 mt-8">Ajouter au stock</button>
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
        title: '',
        image: 'https://gameinferno.fr/wp-content/uploads/2013/12/Super_Mario_Bros._NA-438x600.png',
        platform: 'Autre',
        edition: 'Standard',
        state: 'Bon état',
        contents: ['Jeu', 'Boîte', 'Notice'],
        buyPrice: 20,
        potentialSellPrice: 40,
        potentialBenefits: 20,
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
      game.buyDate = new Date().toISOString().slice(0, 10)
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