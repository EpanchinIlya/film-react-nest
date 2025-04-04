import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsAnswer, ScheduleAnswer } from './dto/films.dto';

@Controller('films/')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll(): FilmsAnswer {
    return this.filmsService.findAllFilms();
  }

  @Get(':id/schedule')
  findById(@Param('id') id: string): ScheduleAnswer {
    const schedule = this.filmsService.findFilmById(id);

    if (schedule) return schedule;
    throw new NotFoundException(`The film  is not showing in the cinema.`);
  }
}
