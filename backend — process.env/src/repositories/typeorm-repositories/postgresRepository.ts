/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FilmDto, Schedule } from 'src/films/dto/films.dto';
import { Repository } from 'typeorm';
import { FilmRepository } from '../filmRepository';
import { FilmEntity } from 'src/entity/film.entity';
import { ScheduleEntity } from 'src/entity/schedule.entity';

@Injectable()
export class PostgresRepository implements FilmRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,

    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async findById(id: string): Promise<Schedule[] | undefined> {
    try {
      const film = await this.filmRepository.findOne({
        where: { id: id },
        relations: ['schedules'],
      });
      if (film) {
        return film.schedules.map((entity) => {
          return this.toScheduleDto(entity);
        });
      } else return undefined;
    } catch (error) {
      console.error('Error finding film by ID:', error);
      return undefined;
    }
  }

  // Асинхронная функция для получения всех фильмов без расписания
  async findAll(): Promise<FilmDto[]> {
    try {
      const films = await this.filmRepository.find();
      if (films) {
        return films.map((entity) => {
          return this.toFilmDto(entity);
        });
      } else return [];
    } catch (error) {
      console.error('Error fetching films:', error);
      return [];
    }
  }

  toFilmDto(entity: FilmEntity): FilmDto {
    return {
      ...entity,
      tags: entity.tags.split(', '),
    };
  }

  toScheduleDto(entity: ScheduleEntity): Schedule {
    return {
      ...entity,
      taken: entity.taken.split(', '),
    };
  }

  async takeSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean> {
    try {
      // Находим фильм по ID
      const film = await this.filmRepository.findOne({
        where: { id: filmId },
        relations: ['schedules'],
      });
      if (!film) {
        throw new NotFoundException(`Film with ID ${filmId} not found.`);
      }

      // Находим сессию по sessionId
      const session = film.schedules.find((s) => s.id === sessionId);
      if (!session) {
        throw new NotFoundException(`Session with ID ${sessionId} not found.`);
      }

      // Формируем строку для места
      const seatKey = `${row}:${seat}`;

      // Проверяем, занято ли место
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(`Seat ${seatKey} is already taken.`);
      }

      // Если место свободно, добавляем его в список занятых мест
      if (session.taken == '') session.taken = seatKey;
      else session.taken = session.taken + ',' + seatKey;

      // Сохраняем обновленный фильм в базе данных
      await this.scheduleRepository.save(session);
      console.log('запись в ==============================================');
      console.log(session.id);

      // Возвращаем true, если операция прошла успешно
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
