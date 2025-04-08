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

@Injectable()
export class MongoRepository {
  constructor(
    @InjectModel('film') private readonly filmModel: Model<FilmWithScheduleDto>, // Инжектируем модель Film
  ) {}

  // Асинхронная функция для получения расписания по ID фильма
  async findById(id: string): Promise<Schedule[] | undefined> {
    try {
      const film = await this.filmModel.findOne({ id }).exec(); // Ищем фильм по ID
      return film ? film.schedule : undefined; // Возвращаем расписание или undefined, если фильм не найден
    } catch (error) {
      console.error('Error finding film by ID:', error);
      return undefined; // Возвращаем undefined в случае ошибки
    }
  }

  // Асинхронная функция для получения всех фильмов без расписания
  async findAll(): Promise<FilmDto[]> {
    try {
      const films = await this.filmModel
        .find()
        .select('-schedule -_id -__v')
        .exec();

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
          image: 'images' + filmObj.image,
          cover: 'images' + filmObj.cover,
        };
      });
    } catch (error) {
      console.error('Error fetching films:', error);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  }

  async takeSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean> {
    try {
      // Находим фильм по ID
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
