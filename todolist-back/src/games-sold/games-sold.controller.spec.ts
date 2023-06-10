import { Test, TestingModule } from '@nestjs/testing';
import { GamesSoldController } from './games-sold.controller';

describe('GamesSoldController', () => {
  let controller: GamesSoldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesSoldController],
    }).compile();

    controller = module.get<GamesSoldController>(GamesSoldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
