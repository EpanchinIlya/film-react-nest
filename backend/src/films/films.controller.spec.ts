import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ScheduleAnswer } from './dto/films.dto';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  const filmsServiceMock = {
    findAllFilms: jest.fn(),
    findFilmById: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue(filmsServiceMock)
      .compile();

    filmsController = app.get<FilmsController>(FilmsController);
    filmsService = app.get<FilmsService>(FilmsService);
  });

  it('.findAll() should return films if found', async () => {
    const mockFilms = { films: [{ id: '1', title: 'Test Film' }] };
    filmsServiceMock.findAllFilms.mockResolvedValue(mockFilms);
    const result = await filmsController.findAll();
    expect(result).toEqual(mockFilms);
  });

  it('.findAll() should throw NotFoundException if films not found', async () => {
    filmsServiceMock.findAllFilms.mockRejectedValue(new NotFoundException());
    await expect(filmsController.findAll()).rejects.toThrow(NotFoundException);
  });

  it('.findById() should call filmsService.findFilmById() with correct id', async () => {
    const filmId = '123';
    const mockSchedule: ScheduleAnswer = {
      total: 1,
      items: [
        {
          id: 's1',
          daytime: '2025-05-10T18:00:00Z',
          hall: 1,
          rows: 10,
          seats: 100,
          price: 350,
          taken: [],
        },
      ],
    };
    filmsServiceMock.findFilmById.mockResolvedValue(mockSchedule);

    const result = await filmsController.findById(filmId);
    expect(filmsService.findFilmById).toHaveBeenCalledWith(filmId);
    expect(result).toEqual(mockSchedule);
  });

  it('.findById() should throw NotFoundException if film not found', async () => {
    const filmId = 'not-found';
    filmsServiceMock.findFilmById.mockResolvedValue(null);

    await expect(filmsController.findById(filmId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
