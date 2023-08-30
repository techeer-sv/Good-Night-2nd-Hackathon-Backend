import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { SModule } from './s/s.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'movie',
      entities: [],
      synchronize: true,
    }),
    MovieModule,
    SModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
