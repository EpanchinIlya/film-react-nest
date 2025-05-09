import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FILM_REPOSITORY } from 'src/repositories/filmRepository';
import { MemoryRepository } from 'src/repositories/memory-repository/memory-repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FILM_REPOSITORY,
          useClass: MemoryRepository,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
