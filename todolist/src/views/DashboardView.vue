<template>
  <div id="dashboard-view" class="p-8 bg-gray-200 h-screen w-full overflow-y-auto">
    <h1 class="text-center">Dashboard</h1>

    <div class="flex flex-wrap justify-center mt-8 gap-8">

      <div class="flex justify-between w-96 bg-gray-800 text-gray-100 rounded-md px-8 py-4">
        <h2 class="font-bold text-xl mb-4">Jeux vendus ce mois-ci</h2>
        <p class="text-3xl font-bold pl-8 whitespace-nowrap">{{ soldThisMonth }}</p>
      </div>

      <div class="flex justify-between w-96 bg-gray-800 text-gray-100 rounded-md px-8 py-4">
        <h2 class="font-bold text-xl mb-4">Ventes totales</h2>
        <p class="text-3xl font-bold pl-8 whitespace-nowrap">{{ totalSales }}</p>
      </div>

      <div class="flex justify-between w-96 bg-yellow-700 text-gray-100 rounded-md px-8 py-4">
        <h2 class="font-bold text-xl mb-4">Revenus totaux</h2>
        <p class="text-3xl font-bold pl-8 whitespace-nowrap">{{ totalRevenue }} €</p>
      </div>

      <div class="flex justify-between w-96 bg-gray-800 text-gray-100 rounded-md px-8 py-4">
        <h2 class="font-bold text-xl mb-4">Statut de l'inventaire</h2>
        <p class="text-3xl font-bold pl-8 whitespace-nowrap">{{ totalInventory }}</p>
      </div>

      <div class="flex justify-between w-96 bg-gray-800 text-gray-100 rounded-md px-8 py-4">
        <h2 class="font-bold text-xl mb-4">Valeur potentielle du stock</h2>
        <p class="text-3xl font-bold pl-8 whitespace-nowrap">{{ potentialStockValue }} €</p>
      </div>

      <div class="flex justify-between w-96 bg-green-700 text-gray-100 rounded-md px-8 py-4">
        <h2 class="font-bold text-xl mb-4">Bénéfices totaux</h2>
        <p class="text-3xl font-bold pl-8 whitespace-nowrap">{{ totalProfit }} €</p>
      </div>

    </div>

    <div class="graphs">



    </div>
  </div>
</template>

<script>
import { getGamesStock } from '@/services/games-stock'
import { getGamesSold } from '@/services/games-sold'

export default {
  name: 'DashboardView',

  data() {
    return {
      totalSales: 0,
      totalRevenue: 0,
      totalProfit: 0,
      totalInventory: 0,
      potentialStockValue: 0,
      soldThisMonth: 0
    }
  },

  async created() {
    await this.calculateStats()
  },

  methods: {
    async calculateStats() {
      const gamesInStock = await getGamesStock()
      const saledGames = await getGamesSold()

      this.totalSales = saledGames.length
      this.totalInventory = gamesInStock.length
      this.totalRevenue = saledGames.reduce((total, game) => total + Number(game.sellPrice), 0)
      this.totalProfit = saledGames.reduce((total, game) => total + (Number(game.sellPrice) - Number(game.buyPrice)), 0)
      this.potentialStockValue = gamesInStock.reduce((total, game) => total + Number(game.potentialSellPrice), 0)
      this.soldThisMonth = saledGames.filter(game => {
        const date = new Date(game.sellDate)
        const now = new Date()

        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      }).length

    }
  }
}
</script>
