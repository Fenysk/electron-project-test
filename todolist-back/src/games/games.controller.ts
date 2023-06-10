import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy } from '@nestjs/common';

const prisma = new PrismaClient();

@Controller('games')
export class GamesController implements OnModuleDestroy {
  private games: any[] = [];

  @Get()
  async getGames() {
    const games = await prisma.gamesInStock.findMany();
    const soldGames = await prisma.gamesSold.findMany();

    const gamesInStock = games.filter((game) => {
      return !soldGames.find((soldGame) => soldGame.gameId === game.id);
    });

    return gamesInStock;
  }

  @Get(':id')
  async getGame(@Param('id', ParseIntPipe) id: number) {
    const game = await prisma.gamesInStock.findUnique({
      where: { id },
      include: { GameContents: true },
    });

    const gameWithContents = {
      ...game,
      contents: game.GameContents.map((content) => content.content),
      GameContents: undefined, // Supprimer la propriété GameContents
    };

    console.log(gameWithContents);

    return gameWithContents;
  }

  @Post()
  async postGame(@Body() game: any) {
    const createdGame = await prisma.gamesInStock.create({
      data: {
        title: game.title,
        image: game.image,
        platform: game.platform,
        edition: game.edition,
        state: game.state,
        buyPrice: game.buyPrice,
        potentialSellPrice: game.potentialSellPrice,
        potentialBenefits: game.potentialBenefits,
        buyDate: new Date(game.buyDate),
        additionalInfos: game.additionalInfos,
      },
    });

    const createdGameContents = game.contents.forEach(async (content) => {
      await prisma.gameContents.create({
        data: {
          gameId: createdGame.id,
          content: content
        }
      });
    });

    return 'Game created !'
  }

  @Put(':id')
  async putGame(@Param('id', ParseIntPipe) id: number, @Body() updatedGame: any) {
    const { contents, ...gameData } = updatedGame;

    gameData.potentialBenefits = gameData.potentialSellPrice - gameData.buyPrice;
  
    const editedGame = await prisma.gamesInStock.update({
      where: { id },
      data: gameData,
    });
  
    await prisma.gameContents.deleteMany({
      where: { gameId: id },
    });
  
    const createdGameContents = await prisma.gameContents.createMany({
      data: contents.map((content) => ({
        gameId: editedGame.id,
        content,
      })),
    });
  
    return 'Game updated !';
  }

  @Delete(':id')
  async deleteGame(@Param('id', ParseIntPipe) id: number) {
    const deletedGame = await prisma.gamesInStock.delete({
      where: { id },
    });
    return deletedGame;
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}