// vue template

<template>
    <div class="game-card
    border-2 border-gray-400
    rounded-md
    p-4
    w-fit-content
    ">
        <li class="game">
            <p class="font-bold text-xl text-center mb-4
            ">{{ game.title }}</p>
            <p>Console : {{ game.platform }}</p>
            <p v-if="game.edition !== 'Standard'">Edition : {{ game.edition }}</p>
            <p>État : {{ game.state }}</p>
            <ul v-if="game.contents">
                <p>Contient :
                    <li class="inline" v-for="content in game.contents" :key="content">{{ content }}{{ content !== game.contents[game.contents.length - 1] ? ', ' : '' }}</li>
                </p>
            </ul>
            <p>Prix d'achat : {{ game.buyPrice }} €</p>
            <p>Prix estimé : {{ game.potentialSellPrice }} €</p>
            <p>Acheté le {{ game.buyDate }}</p>
            <p v-if="game.additonalInfos">{{ game.additonalInfos }}</p>
        </li>
    </div>
</template>

<script>
export default {
    name: 'Game',

    props: {
        game: {
            type: Object,
            required: true
        }
    },
}
</script>