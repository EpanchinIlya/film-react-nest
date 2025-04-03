import { Controller, Get } from '@nestjs/common';

@Controller('films/')
export class FilmsController {
  @Get()
  findAll(): string {
    return 'Этот метод возвращает список фильмов';
  }

  @Get(':id/schedule')
  findById(): string {
    return 'Этот метод возвращает список фильмов';
  }

  //   @Post() // Обрабатывает POST-запрос на /films
  //   create(): string {
  //     return 'Этот метод создаёт новый фильм';
  //   }
}
