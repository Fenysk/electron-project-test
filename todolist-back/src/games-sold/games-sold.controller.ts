import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy } from '@nestjs/common';

const prisma = new PrismaClient();

@Controller('games-sold')
export class GamesSoldController {
    private games: any[] = [];

    @Get()
    async getGames() {
        const games = await prisma.gamesInStock.findMany();
        const soldGames = await prisma.gamesSold.findMany();
        
        const gamesSolded = soldGames.map((soldGame) => {
            const game = games.find((game) => game.id === soldGame.gameId);
            return {
                ...game,
                sellPrice: soldGame.sellPrice,
                sellDate: soldGame.sellDate,
            };
        });

        console.log(gamesSolded);

        return gamesSolded;
    }

    @Post()
    async postGame(@Body() game: any) {
        const createdGameSold = await prisma.gamesSold.create({
            data: {
                gameId: game.id,
                sellPrice: game.sellPrice,
                sellDate: new Date(),
            },
        });

        return 'Game solded !'
    }

}
