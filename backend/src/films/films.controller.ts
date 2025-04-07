import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsAnswer, ScheduleAnswer } from './dto/films.dto';

@Controller('films/')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<FilmsAnswer> {
    try {
      const films = await this.filmsService.findAllFilms(); // Ожидаем получения фильмов
      return films;
    } catch (error) {
      throw new NotFoundException('Films not found.');
    }
  }

  @Get(':id/schedule')
  async findById(@Param('id') id: string): Promise<ScheduleAnswer> {
    try {
      const schedule = await this.filmsService.findFilmById(id); // Ожидаем получения расписания фильма

      if (!schedule) {
        throw new NotFoundException(`The film is not showing in the cinema.`);
      }

      return schedule;
    } catch (error) {
      throw new NotFoundException(`The film with ID ${id} not found.`);
    }
  }
}
