//TODO реализовать DTO для /orders
import { IsString, IsEmail, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class TicketDTO {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsString()
  day: string;

  @IsString()
  time: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class OrderDTO {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @Type(() => TicketDTO) // Преобразуем каждый элемент массива в объект TicketDTO
  tickets: TicketDTO[];
}

export interface OrderAnswer {
  total: number;
  items: (Omit<TicketDTO, 'day' | 'time'> & { id: string })[]; // добавляем поле id поверх TicketDTO
}

// {
//   email: 'epanchin.ilya@yandex.ru',
//   phone: '+7 (902) 269 49 55',
//   tickets: [
//     {
//       film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
//       session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
//       daytime: '2024-06-28T10:00:53+03:00',
//       day: '28 июня',
//       time: '12:00',
//       row: 1,
//       seat: 1,
//       price: 350
//     },
//     {
//       film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
//       session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
//       daytime: '2024-06-28T10:00:53+03:00',
//       day: '28 июня',
//       time: '12:00',
//       row: 1,
//       seat: 2,
//       price: 350
//     }
//   ]
// }
