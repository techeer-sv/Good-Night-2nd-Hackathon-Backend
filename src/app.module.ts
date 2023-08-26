import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ReviewsController } from "./reviews/reviews.controller";
import { ReviewsService } from "./reviews/reviews.service";
import { ReviewsModule } from "./reviews/reviews.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ormConfig } from "ormconfig";
import { MoviesModule } from "./movies/movies.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    MoviesModule,
    ReviewsModule,
  ],
  controllers: [AppController, ReviewsController],
  providers: [AppService, ReviewsService],
})
export class AppModule {}
