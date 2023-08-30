import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entiity';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])], // movie entity 등록
  providers: [MovieService],
})
export class MovieModule {}
