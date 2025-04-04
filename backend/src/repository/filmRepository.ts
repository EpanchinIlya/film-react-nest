import { Film, Schedule } from 'src/films/dto/films.dto';

export const FILM_REPOSITORY = Symbol('FILM_REPOSITORY');

export interface FilmRepository {
  findById(id: string): Schedule[] | undefined;
  findAll(): Film[];
  takeSeat(film: string, session: string, row: number, seat: number);
}
