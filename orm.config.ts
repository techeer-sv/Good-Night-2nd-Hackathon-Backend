import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from 'src/movies/entities/movie.entity';
import { Comment } from 'src/comments/entities/comment.entity';
function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [Movie, Comment],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: false,
  };

  return {
    name: 'default',
    type: 'mysql',
    database: 'test',
    host: 'localhost',
    port: Number(3307),
    username: 'root',
    password: '12341234',
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

export { ormConfig };
