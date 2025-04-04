import { Injectable, Inject } from '@nestjs/common';
import { FilmsAnswer, ScheduleAnswer } from './dto/films.dto';
import { FILM_REPOSITORY, FilmRepository } from 'src/repository/filmRepository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILM_REPOSITORY) private readonly filmRepository: FilmRepository,
  ) {}

  findAllFilms(): FilmsAnswer {
    const films = this.filmRepository
      .findAll()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ schedule: _, ...other }) => other);

    return {
      total: films.length,
      items: films,
    };
  }

  findFilmById(id: string): ScheduleAnswer | undefined {
    const schedule = this.filmRepository.findById(id);

    if (schedule) {
      return {
        total: schedule.length,
        items: schedule,
      };
    } else return undefined;
  }
}
