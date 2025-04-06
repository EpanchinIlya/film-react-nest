import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { FILM_REPOSITORY, FilmRepository } from 'src/repository/filmRepository';
import { OrderAnswer, OrderDTO } from './dto/order.dto';
import { v4 as uuid } from 'uuid';


@Injectable()
export class OrderService {
  constructor(
    @Inject(FILM_REPOSITORY) private readonly filmRepository: FilmRepository,
  ) {}

  createOrder(body: OrderDTO): OrderAnswer {
    const tickets = body.tickets; // буду получать весь body в сервис, а то вдруг понадобится email потом

    tickets.forEach((ticket) => {
      const schedule = this.filmRepository.findById(ticket.film);
      if (!schedule)
        throw new NotFoundException(`Такого фильма нет в показе кинотеатра`); // не плохо бы перенести в контроллер

      const session = schedule.find((item) => item.id === ticket.session);
      if (!session) throw new NotFoundException(`На данное время сеансов нет`);

      const taken = session.taken.find(
        (item) => item === `${ticket.row}:${ticket.seat}`,
      );
      if (taken) throw new NotFoundException(`Выбранное место уже занято`);
      else{
       this.filmRepository.takeSeat(
          ticket.film,
          ticket.session,
          ticket.row,
          ticket.seat,
        );
       }
       
    });

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

    const answer: OrderAnswer = {
      total: tickets.length,
      items: fullTickets,
    };
    return answer;
  }
}
