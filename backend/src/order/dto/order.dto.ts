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
