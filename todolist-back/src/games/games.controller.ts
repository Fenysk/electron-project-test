import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { OnModuleDestroy } from '@nestjs/common';

const prisma = new PrismaClient();

@Controller('games')
export class GamesController implements OnModuleDestroy {
  private games: any[] = [];

  @Get()
  async getGames() {
    const games = await prisma.gamesInStock.findMany();
    return games;
  }

  @Get(':id')
  async getGame(@Param('id') id: number) {
    const game = await prisma.gamesInStock.findUnique({
      where: { id },
    });
    return game;
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
    return createdGame;
  }

  @Put(':id')
  async putGame(@Param('id') id: number, @Body() updatedGame: any) {
    const game = await prisma.gamesInStock.update({
      where: { id },
      data: updatedGame,
    });
    return game;
  }

  @Delete(':id')
  async deleteGame(@Param('id') id: number) {
    const deletedGame = await prisma.gamesInStock.delete({
      where: { id },
    });
    return deletedGame;
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}