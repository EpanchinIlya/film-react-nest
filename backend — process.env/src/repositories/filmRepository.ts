import { FilmDto, Schedule } from 'src/films/dto/films.dto';

export const FILM_REPOSITORY = Symbol('FILM_REPOSITORY');

export interface FilmRepository {
  findById(id: string): Promise<Schedule[] | undefined>;
  findAll(): Promise<FilmDto[]>;
  takeSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean>;
}
