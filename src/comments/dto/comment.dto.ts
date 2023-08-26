import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CommentResultDto {
  @Expose()
  movieId: number;
  @Expose()
  id: number;
  @Expose()
  content: string;
  @Expose()
  rating: number;
}

@Exclude()
export class CreateCommentResultDto {
  @Expose()
  movieId: number;
  @Expose()
  id: number;
  @Expose()
  createdAt: Date;
}

@Exclude()
export class UpdateCommentResultDto {
  @Expose()
  id: number;
  @Expose()
  updatedAt: Date;
}

@Exclude()
export class DeleteCommentResultDto {
  @Expose()
  id: number;
}
