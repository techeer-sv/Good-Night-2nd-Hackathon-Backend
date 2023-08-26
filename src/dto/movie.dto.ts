import { ApiProperty } from '@nestjs/swagger';

export class PostPutMovieDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ enum: ['스릴러', '로맨스', '코믹', '액션'] })
  genre: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  releaseDate: Date;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  endDate: Date;

  @ApiProperty()
  isShowing: boolean;
}
