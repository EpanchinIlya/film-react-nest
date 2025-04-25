import { Schema, model } from 'mongoose';
import { FilmDto, Schedule } from 'src/films/dto/films.dto';

export interface FilmWithScheduleDto extends FilmDto {
  schedule: Schedule[];
}

export const ScheduleSchema = new Schema({
  id: { type: String, required: true },
  daytime: { type: String, required: true },
  hall: { type: Number, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], required: true }, // теперь это массив строк, например: ["5:5", "3:7"]
});

export const FilmSchema = new Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  cover: { type: String },
  schedule: { type: [ScheduleSchema], default: [] },
});

export default model<FilmWithScheduleDto>('film', FilmSchema);
