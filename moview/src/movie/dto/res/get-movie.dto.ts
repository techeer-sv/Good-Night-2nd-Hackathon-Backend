import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetMovieDto {
  @Expose()
  title: string;
  @Expose()
  genre: string;
  @Expose()
  releaseStatus: boolean;
  @Expose()
  releaseDate: string;
  @Expose()
  endDate: string;
}
