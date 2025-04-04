//TODO реализовать DTO для /orders
import {
  IsString,
  IsEmail,
  IsArray,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

class TicketDTO {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDateString()
  daytime: string;

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
