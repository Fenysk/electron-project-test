import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { GamesSoldController } from './games-sold/games-sold.controller';

@Module({
  imports: [GamesModule],
  controllers: [AppController, GamesSoldController],
  providers: [AppService],
})
export class AppModule {}
