<template>
    <div id="stock-details" class="
    bg-gray-200
    w-full min-h-screen max-h-screen
    py-4 sm:py-8 md:py-12 lg:py-16
    ">
        <div class="game
        border-2 border-gray-400 rounded-2xl bg-gray-800
        min-h-[300px] min-w-[300px] w-fit
        max-w-[70%]
        mx-auto
        text-white
        px-12 py-8
        ">
            <div class="header flex justify-between gap-8 relative mb-12">

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
                            aspect-square inline-block mt-2 max-h-12
                            " />
                            <p v-else class="text-xl">{{ game.platform }}</p>
                            <h2 class=" text-3xl font-bold">{{ game.title }}</h2>
                        </div>
                        <p class="text-xl mt-2">Edition : {{ game.edition }}</p>
                        <p v-if="game.contents" class="text-xl mt-2">Contient : {{ game.contents.join(', ') }}</p>
                    </div>
                    <div class="bottom flex flex-col">
                        <p class="text-xl mt-2">Acheté le {{ buyDateToDisplay }}</p>
                        <div class="prices flex flex-wrap gap-4 mt-2 text-xl">
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
                object-contain h-auto max-h-[30vh] rounded-md
                " />
            </div>
            <form v-if="editMode" @submit.prevent="editGame(game.id)" class="
            flex flex-wrap gap-4
            w-full
            py-6
            border-t-2 border-gray-400
            overflow-auto
            max-h-64
            ">

                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Titre</label>
                    <input type="text" v-model="game.title" placeholder="Nom du jeu" class="
                    rounded-md bg-gray-200 text-black px-2 py-1
                    w-2/3
                    " />
                </div>

                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Image</label>
                    <input type="text" v-model="game.image" placeholder="URL de l'image" class="
                    rounded-md bg-gray-200 text-black px-2 py-1
                    w-2/3
                    " />
                </div>

                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Plateforme</label>
                    <select v-model="game.platform" class="
                    rounded-md bg-gray-200 text-black px-2 py-1
                    w-2/3
                    ">
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="PlayStation 4">PlayStation 4</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Xbox One">Xbox One / Series</option>
                        <option value="PC">PC</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>

                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Edition</label>
                    <input type="text" v-model="game.edition" placeholder="Edition du jeu" class="
                    rounded-md bg-gray-200 text-black px-2 py-1
                    w-2/3
                    " />
                </div>

                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Contenu</label>
                    <div class="w-2/3">
                        <input
                            @keyup.enter="game.contents.push(contentToAdd)"
                            type="text"
                            v-model="contentToAdd"
                            placeholder="Notice, boîte..."
                            class="rounded-md bg-gray-200 text-black px-2 py-1" />
                        <button
                            type="button"
                            @click="game.contents.push(contentToAdd)"
                            class="bg-green-100 text-green-800 border-none px-2 py-1 rounded-md text-md font-bold transition duration-200 hover:bg-green-300
                        ">Ajouter</button>
                    </div>
                </div>

                <div v-if="game.contents.length > 0"
                class="flex items-center mr-full w-full px-8 gap-3">
                    <div class="
                    text-right
                    w-1/4
                    "></div>
                    <p v-for="(content, index) in game.contents"
                    :key="index"
                    class="rounded-md bg-gray-200 text-black px-2 py-1 cursor-pointer
                    hover:bg-red-300 hover:text-red-800 hover:scale-90 transition duration-200
                    "
                    @click="game.contents.splice(index, 1)"
                    >
                        {{ content }}
                    </p>
                </div>

                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Prix d'achat</label>
                    <input type="number" v-model="game.buyPrice" placeholder="Prix d'achat" class="
                    rounded-md bg-gray-200 text-black px-2 py-1
                    w-2/3
                    " />
                </div>

                <!-- Prix estimé -->
                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Prix estimé</label>
                    <input type="number" v-model="game.potentialSellPrice" placeholder="Prix estimé" class="
                    rounded-md bg-gray-200 text-black px-2 py-1
                    w-2/3
                    " />
                </div>

                <div class="flex items-center mr-full w-full px-8 gap-3">
                    <label class="
                    text-right
                    w-1/4
                    ">Informatons supplémentaires</label>
                    <input type="text" v-model="game.additionalInfos" placeholder="Info supp" class="
                    rounded-md bg-gray-200 text-black px-2 py-1
                    w-2/3
                    " />
                </div>
            </form>
            <div class="
            controls
            flex flex-wrap gap-4
            w-full
            pt-12
            border-t-2 border-gray-400
            ">
                <button @click="enterEditMode()" v-if="!editMode"
                    class="bg-orange-100 text-gray-800 border-none px-8 py-4 rounded-md text-xl font-bold transition duration-200  w-auto hover:bg-orange-300">Editer</button>
                <button @click="editGame(game.id)" v-if="editMode"
                    class="bg-orange-100 text-gray-800 border-none px-8 py-4 rounded-md text-xl font-bold transition duration-200  w-auto hover:bg-orange-300">Enregistrer</button>
                <button @click="sellGame(game)"
                    class="bg-green-100 text-gray-800 border-none px-8 py-4 rounded-md text-xl font-bold transition duration-200 w-auto  hover:bg-green-300">Vendu</button>
                <input v-model="game.sellPrice" type="number" class="rounded-md bg-gray-200 text-black px-2 py-1 w-16" />
                <button @click="deleteGame(game.id)"
                    class="bg-transparent text-gray-100 border-2 px-8 py-4 rounded-md text-xl font-bold ml-auto transition duration-200 hover:bg-red-800 hover:text-gray-100 hover:border-red-800">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getGame, deleteGame, putGame } from '@/services/games'
import { postGameSold } from '@/services/games-sold'
export default {
    name: 'StockDetailsView',

    data() {
        return {
            game: {},
            editMode: false,
            buyDateToDisplay: '',
            contentToAdd: ''
        }
    },

    methods: {
        async deleteGame(id) {
            await deleteGame(id)
            this.$router.push('/stock')
        },

        async enterEditMode() {
            this.editMode = true
        },

        async editGame(id) {
            await putGame(id, this.game)
            await this.getGame()
            this.editMode = false
        },

        async sellGame(game) {
            await postGameSold(game)
            // this.$router.push('/stock')
        },

        async getGame() {
            const id = this.$route.params.id
            this.game = await getGame(id)
        }
    },
    
    //update potentialBenefits when buyPrice or potentialSellPrice
    watch: {
        'game.buyPrice': function() {
            this.game.potentialBenefits = this.game.potentialSellPrice - this.game.buyPrice
        },
        'game.potentialSellPrice': function() {
            this.game.potentialBenefits = this.game.potentialSellPrice - this.game.buyPrice
        }
    },
    

    async created() {

        console.log(this.$route.params.id)

        await this.getGame()
        this.buyDateToDisplay = new Date(this.game.buyDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    }
}
</script>