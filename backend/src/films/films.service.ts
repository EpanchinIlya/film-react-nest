import { Injectable, Inject } from '@nestjs/common';
import { FilmsAnswer, ScheduleAnswer } from './dto/films.dto';
import {
  FILM_REPOSITORY,
  FilmRepository,
} from 'src/repositories/filmRepository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(FILM_REPOSITORY) private readonly filmRepository: FilmRepository,
  ) {}

  // Асинхронная функция для получения всех фильмов
  async findAllFilms(): Promise<FilmsAnswer> {
    try {
      const films = await this.filmRepository.findAll();
      return {
        total: films.length, // Общее количество фильмов
        items: films, // Сами фильмы
      };
    } catch (error) {
      console.error('Error fetching films:', error);
      return {
        total: 0,
        items: [],
      };
    }
  }

  // Функция для получения фильма по ID и его расписания

  async findFilmById(id: string): Promise<ScheduleAnswer | undefined> {
    try {
      const schedules = await this.filmRepository.findById(id);

      if (schedules) {
        return {
          total: schedules.length,
          items: schedules,
        };
      } else {
        return undefined;
      }
    } catch (error) {
      console.error('Error fetching film by ID:', error);
      return undefined;
    }
  }
}
