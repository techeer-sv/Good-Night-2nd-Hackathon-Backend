export class CreateMovieDto {
  title: string;
  genre: string;
  releaseDate: Date;
  endDate: Date;
  isShowing?: boolean;
}
