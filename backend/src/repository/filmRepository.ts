import { Film } from 'src/films/dto/films.dto';

export const FILM_REPOSITORY = Symbol('FILM_REPOSITORY');

export interface FilmRepository {
  findById(id: string): Film | undefined;
  findAll(): Film[];
}
