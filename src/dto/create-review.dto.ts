import { IsInt, Min, Max, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
