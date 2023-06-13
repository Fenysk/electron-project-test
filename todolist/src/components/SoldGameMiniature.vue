<template>
    <li class="game
    border-2 border-gray-400 rounded-2xl overflow-hidden
    bg-gray-800 text-gray-100
    flex gap-4
    relative
    group
    ">
        <img class="
        p-2 md:p-3
        aspect-[5/4] object-cover object-top object-left
        w-1/3 rounded-xl
        group-hover:object-bottom group-hover:object-right
        transition-all duration-500
        " :src="game.image" alt="Image de la jaquette du jeu">

        <div class="overflow-hidden w-full relative
        p-2 md:p-3
        ">
            <p class="
            text-xl md:text-2xl font-bold
            whitespace-nowrap truncate
            ">{{ game.title }}</p>

            <div class="flex mt-4">
                <div class="prices">
                    <div>
                        <p class="
                            inline-block
                            px-2 py-1
                            w-fit-content
                            bg-orange-300 text-orange-800
                            rounded-xl
                            whitespace-nowrap
                        ">Vendu <strong>{{ game.sellPrice }}</strong> €</p>
                    </div>
                    <div class="mt-2">
                        <p class="
                            inline-block
                            px-2 py-1
                            w-fit-content
                            bg-green-300 text-green-800
                            rounded-xl
                            whitespace-nowrap
                        ">Gains <strong>{{ game.benefits }}</strong> €</p>
                    </div>
                </div>
                <div class="ml-4 overflow-hidden">
                    <p class="whitespace-nowrap truncate" >État : {{ game.state }}</p>
                </div>
            </div>

            <p class="
            mt-4 bottom-0
            text-right opacity-60
            whitespace-nowrap truncate
            ">Vendu le {{ game.sellDate }}</p>
        </div>

        <div @click="deleteGame(game.id)"
        class="
        flex items-center justify-center cursor-pointer
        bg-red-500 text-white w-0 overflow-hidden
        group-hover:w-1/3 group-hover:px-8 transition-all duration-500
        ">
            Supprimer
        </div>
    </li>
</template>

<script>

export default {
    name: 'SoldGameMiniature',

    props: {
        game: {
            type: Object,
            required: true
        }
    },

    methods: {
        deleteGame(id) {
            this.$emit('delete-game', id)
        },
    }
}
</script>