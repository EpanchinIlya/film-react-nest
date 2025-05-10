import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import {
  FILM_REPOSITORY,
  FilmRepository,
} from 'src/repositories/filmRepository';
import { OrderAnswer, OrderDTO } from './dto/order.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FILM_REPOSITORY) private readonly filmRepository: FilmRepository,
  ) {}

  async createOrder(body: OrderDTO): Promise<OrderAnswer> {
    const tickets = body.tickets; // Получаем все билеты из тела запроса

    // Обрабатываем каждый билет
    for (const ticket of tickets) {
      const schedule = await this.filmRepository.findById(ticket.film); // Асинхронно получаем фильм по ID
      if (!schedule) {
        throw new NotFoundException(`Такого фильма нет в показе кинотеатра`);
      }

      // Ищем сессию в расписании
      const session = schedule.find((item) => item.id === ticket.session);
      if (!session) {
        throw new NotFoundException(`На данное время сеансов нет`);
      }

      // Проверяем, занято ли место
      const taken = session.taken.find(
        (item) => item === `${ticket.row}:${ticket.seat}`,
      );
      if (taken) {
        throw new ConflictException('Выбранное место уже занято');
      }

      await this.filmRepository.takeSeat(
        ticket.film,
        ticket.session,
        ticket.row,
        ticket.seat,
      );
    }

    // Создаем список полных билетов с уникальными ID
    const fullTickets = tickets.map(
      ({ film, session, daytime, row, seat, price }) => ({
        film,
        session,
        daytime,
        row,
        seat,
        price,
        id: uuid(),
      }),
    );

    // Формируем ответ
    const answer: OrderAnswer = {
      total: tickets.length,
      items: fullTickets,
    };

    return answer;
  }
}
