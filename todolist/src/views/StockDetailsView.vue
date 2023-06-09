// vue template

<template>
    <div id="stock-details" class="
    px-12 py-16 bg-gray-100
    w-full h-screen
    ">
        <div class="game
        border-2 border-gray-400 rounded-2xl bg-gray-800
        min-h-[300px] min-w-[300px] w-fit
        mx-auto
        text-white
        px-12 py-8
        ">
            <div class="header flex justify-between gap-8 relative">

                <p class="
                absolute -right-3 -top-3
                text-xl font-bold
                bg-gray-900 text-yellow-400
                px-4 py-2 rounded-full
                ">{{ game.state }}</p>

                <div class="informations flex flex-col justify-between">
                    <div class="top">
                        <div class="flex gap-2 items-center">
                            <img v-if="game.platform === 'Nintendo Switch'" src="@/assets/switch-logo.png"
                                alt="Logo Nintendo Switch" class="
                            aspect-square inline-block mt-2 h-12
                            " />
                            <p v-else class="text-xl">{{ game.platform }}</p>
                            <h2 class=" text-3xl font-bold">{{ game.title }}</h2>
                        </div>
                        <p class="text-xl mt-2">Edition : {{ game.edition }}</p>
                        <p v-if="game.contents" class="text-xl mt-2">Contient : {{ game.contents.join(', ') }}</p>
                    </div>
                    <div class="bottom flex flex-col">
                        <p class="text-xl mt-2">Acheté le {{ game.buyDate }}</p>
                        <div class="prices flex gap-4 mt-2 text-xl">
                            <p class=" buy bg-red-300 text-red-800 inline-block rounded-full px-4 py-2">Acheté
                                {{ game.buyPrice }} €</p>
                            <p class=" sell bg-orange-300 text-orange-800 inline-block rounded-full px-4 py-2">
                                Gains {{ game.potentialBenefits }} €</p>
                            <p class=" sell bg-green-300 text-green-800 inline-block rounded-full px-4 py-2">
                                Estimé {{ game.potentialSellPrice }} €</p>
                        </div>
                    </div>
                </div>
                <img :src="game.image" :alt="game.title" class="
                object-contain max-h-[30vh]
                " />
            </div>
            <div class="
            controls
            flex gap-4
            w-full
            pt-12 mt-12
            border-t-2 border-gray-400
            ">
                <button
                    @click="editGame(game)"
                    class="bg-gray-200 text-gray-800 border-none px-8 py-4 rounded-md text-xl font-bold transition duration-200 hover:bg-gray-400">Editer</button>
                <button
                    @click="sellGame(game)"
                    class="bg-gray-200 text-gray-800 border-none px-8 py-4 rounded-md text-xl font-bold transition duration-200 hover:bg-green-300">Vendu</button>
                <button
                    @click="deleteGame(game)"
                    class="bg-transparent text-gray-100 border-2 px-8 py-4 rounded-md text-xl font-bold ml-auto transition duration-200 hover:bg-red-800 hover:text-gray-100 hover:border-red-800">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getGame } from '@/services/games'
export default {
    name: 'StockDetailsView',

    data() {
        return {
            game: {}
        }
    },

    methods: {
        async deleteGame(game) {
            
        },

        async editGame(game) {
            
        },

        async sellGame(game) {
            
        }
    },

    async created() {
        this.game = await getGame(this.$route.params.id)
        this.game.buyDate = new Date(this.game.buyDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    }
}
</script>