import { Test, TestingModule } from '@nestjs/testing';
import { MusicListService } from './music-list.service';

describe('MusicListService', () => {
  let service: MusicListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicListService],
    }).compile();

    service = module.get<MusicListService>(MusicListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
