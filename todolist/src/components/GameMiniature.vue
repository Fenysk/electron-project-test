<template>
    <a :href="`/stock/${game.id}`">
        <li class="game group
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
            bg-red-500
            rounded-l-xl
            ">{{ game.buyPrice }} €</p>
                <p class="
            px-3
            bg-yellow-600
            ">{{ game.potentialBenefits }} €</p>
                <p class="
            px-3
            bg-green-500
            rounded-r-xl
            ">{{ game.potentialSellPrice }} €</p>
            </div>

            <p class="
            px-3 mb-2
            text-gray-400
            self-end
            ">{{ game.state }}</p>
        </li>
    </a>
</template>

<script>
export default {
    name: 'GameMiniature',

    props: {
        game: {
            type: Object,
            required: true
        }
    },
}
</script>