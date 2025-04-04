import { Injectable, Inject } from '@nestjs/common';
import { FilmDto } from './dto/films.dto';
import { FILM_REPOSITORY, FilmRepository } from 'src/repository/filmRepository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILM_REPOSITORY) private readonly filmRepository: FilmRepository,
  ) {}

  findAllFilms(): FilmDto[] {
    return (
      this.filmRepository
        .findAll()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ schedule: _, ...other }) => other)
    );
  }

  findFilmById(id: string): FilmDto | undefined {
    return this.filmRepository.findById(id); // Используем репозиторий для получения фильма по ID
  }
}
