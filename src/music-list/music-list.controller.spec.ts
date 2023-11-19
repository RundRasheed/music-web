import { Test, TestingModule } from '@nestjs/testing';
import { MusicListController } from './music-list.controller';

describe('MusicListController', () => {
  let controller: MusicListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicListController],
    }).compile();

    controller = module.get<MusicListController>(MusicListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
