import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  title: string;
  genre: string;
  releaseStatus: boolean;
  @Transform(({ value }) => new Date(value))
  releaseDate: Date;
  @Transform(({ value }) => new Date(value))
  endDate: Date;
}
