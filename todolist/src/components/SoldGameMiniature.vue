<template>
    <li class="game
    border-2 border-gray-400 rounded-2xl overflow-hidden
    bg-gray-800 text-gray-100
    flex gap-4
    p-2 md:p-3
    ">
        <img class="
        aspect-[5/4] object-cover object-top
        w-1/3 rounded-xl
        hover:object-bottom transition-all duration-500
        " :src="game.image" alt="Image de la jaquette du jeu">

        <div class="overflow-hidden w-full relative">
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
                        ">Vendu <strong>{{ game.sellPrice }}</strong> €</p>
                    </div>
                    <div class="mt-2">
                        <p class="
                            inline-block
                            px-2 py-1
                            w-fit-content
                            bg-green-300 text-green-800
                            rounded-xl
                        ">Gains <strong>{{ game.benefits }}</strong> €</p>
                    </div>
                </div>
                <div class="ml-4">
                    <p class="" >État : {{ game.state }}</p>
                </div>
            </div>

            <p class="
            mt-4 bottom-0
            text-right opacity-60
            ">Vendu le {{ game.sellDate }}</p>
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
}
</script>