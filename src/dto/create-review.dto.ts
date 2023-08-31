import { IsInt, Min, Max, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
}
