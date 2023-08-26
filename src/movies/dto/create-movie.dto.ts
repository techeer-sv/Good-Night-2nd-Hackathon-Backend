import { Transform } from 'class-transformer';

export class CreateMovieDto {
  title: string;
  genre: string;
  @Transform(({ value }) => new Date(value))
  releaseDate: Date;
  @Transform(({ value }) => new Date(value))
  endDate: Date;
  isShowing: boolean;
}
