import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('games')
export class GamesController {
  private games: any[] = [];

  @Get()
  getGames() {
    return this.games;
  }

  @Get(':id')
  getGame(@Param('id') id: string) {
    return this.games.find(game => game.id === id);
  }

  @Post()
  postGame(@Body() game: any) {
    this.games.push(game);
    return game;
  }

  @Put(':id')
  putGame(@Param('id') id: string, @Body() updatedGame: any) {
    const gameIndex = this.games.findIndex(game => game.id === id);
    if (gameIndex !== -1) {
      this.games[gameIndex] = updatedGame;
      return updatedGame;
    }
    return null;
  }

  @Delete(':id')
  deleteGame(@Param('id') id: string) {
    const gameIndex = this.games.findIndex(game => game.id === id);
    if (gameIndex !== -1) {
      const deletedGame = this.games[gameIndex];
      this.games.splice(gameIndex, 1);
      return deletedGame;
    }
    return null;
  }
}
