import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { Movie } from './movie/entity/movie.entiity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/entity/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'movie',
      entities: [Movie, Review],
      synchronize: true,
    }),
    MovieModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
