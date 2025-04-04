import { Controller, Get } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsAnswer } from './dto/films.dto';

@Controller('films/')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): FilmsAnswer {
    const films = this.filmsService.findAllFilms();
    return {
      total: films.length,
      items: films,
    };
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
