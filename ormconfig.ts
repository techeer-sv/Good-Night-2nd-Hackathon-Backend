import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Movie } from "src/movies/entities/movie.entity";
import { Review } from "src/reviews/entities/reviews.entity";

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [Movie, Review],
    MIGRATIONS: [__dirname + "/migrations/**/*{.ts,.js}"],
    MIGRATIONS_RUN: false,
  };

  return {
    name: "hackerton",
    type: "mysql",
    database: "nest",
    host: "localhost",
    port: Number(3307),
    username: "root",
    password: "1234",
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

export { ormConfig };
