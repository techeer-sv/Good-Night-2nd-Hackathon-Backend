import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './domain/movie.entity';

@Module({
  providers: [MovieService],
  controllers: [MovieController],
  imports: [TypeOrmModule.forFeature([Movie])],
})
export class MovieModule {}
