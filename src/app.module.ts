import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { databaseProviders } from './config/database.providers';

@Module({
  imports: [MovieModule],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
