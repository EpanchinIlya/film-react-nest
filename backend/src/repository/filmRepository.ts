import { FilmDto, Schedule } from 'src/films/dto/films.dto';

export const FILM_REPOSITORY = Symbol('FILM_REPOSITORY');

export interface FilmRepository {
  findById(id: string): Schedule[] | undefined;
  findAll(): FilmDto[];
  takeSeat(film: string, session: string, row: number, seat: number);
}
