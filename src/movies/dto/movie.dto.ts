import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MovieResultDto {
  @Expose()
  id: number;

  // 제목
  @Expose()
  title: string;

  // 장르
  @Expose()
  genre: string;

  // 개봉일
  @Expose()
  releaseDate: Date;

  // 상영 종료일
  @Expose()
  endDate: Date;

  // 상영 중 여부
  @Expose()
  isShowing: boolean;
}

@Exclude()
export class CreateMovieResultDto {
  @Expose()
  id: number;
  @Expose()
  createdAt: Date;
}

@Exclude()
export class UpdateMovieResultDto {
  @Expose()
  id: number;
  @Expose()
  updatedAt: Date;
}

@Exclude()
export class DeleteMovieResultDto {
  @Expose()
  id: number;
}
