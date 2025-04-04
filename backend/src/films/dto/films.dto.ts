import {
  IsString,
  IsArray,
  IsNumber,
  //IsUUID,
  IsNotEmpty,
  //IsOptional,
} from 'class-validator';

export class FilmDto {
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;
}

export interface Schedule {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: any[];
}

export interface Film extends Omit<FilmDto, 'schedule'> {
  schedule: Schedule[];
}

export interface FilmsAnswer {
  total: number;
  items: FilmDto[];
}

export interface ScheduleAnswer {
  total: number;
  items: Schedule[];
}
