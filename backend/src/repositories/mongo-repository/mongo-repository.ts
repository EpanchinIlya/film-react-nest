import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  Schedule,
  FilmDto,
  FilmWithScheduleDto,
} from 'src/films/dto/films.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmRepository } from '../filmRepository';

@Injectable()
export class MongoRepository implements FilmRepository {
  constructor(
    @InjectModel('film') private readonly filmModel: Model<FilmWithScheduleDto>,
  ) {}

  async findById(id: string): Promise<Schedule[] | undefined> {
    try {
      const film = await this.filmModel.findOne({ id }).exec();
      return film ? film.schedule : undefined;
    } catch (error) {
      console.error('Error finding film by ID:', error);
      return undefined;
    }
  }

  async findAll(): Promise<FilmDto[]> {
    try {
      const films = await this.filmModel.find().select('-_id -__v').exec();

      //return films;

      return films.map((film) => {
        const filmObj = film.toObject();
        return {
          id: filmObj.id,
          rating: filmObj.rating,
          director: filmObj.director,
          tags: filmObj.tags,
          title: filmObj.title,
          about: filmObj.about,
          description: filmObj.description,
          image: filmObj.image,
          cover: filmObj.cover,
          schedule: filmObj.schedule,
        };
      });
    } catch (error) {
      console.error('Error fetching films:', error);
      return [];
    }
  }

  async takeSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean> {
    try {
      const film = await this.filmModel.findOne({ id: filmId }).exec(); // Ищем фильм по ID
      if (!film) {
        throw new NotFoundException(`Film with ID ${filmId} not found.`);
      }

      // Находим сессию по sessionId
      const session = film.schedule.find((s) => s.id === sessionId);
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
      session.taken.push(seatKey);

      // Сохраняем обновленный фильм в базе данных
      await film.save();

      // Возвращаем true, если операция прошла успешно
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
