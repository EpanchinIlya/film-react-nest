import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FILM_REPOSITORY } from 'src/repositories/filmRepository';
import { MemoryRepository } from 'src/repositories/memory-repository/memory-repository';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: FILM_REPOSITORY,
          useClass: MemoryRepository,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
