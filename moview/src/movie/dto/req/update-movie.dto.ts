import { Transform } from 'class-transformer';

export class UpdateMovieDto {
  title: string;
  genre: string;
  releaseStatus: boolean;
  @Transform(({ value }) => new Date(value))
  releaseDate: Date;
  @Transform(({ value }) => new Date(value))
  endDate: Date;
}
