import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from './movie/domain/movie.entity';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [Movie],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: false,
  };

  return {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: '12341234',
    database: 'moview',
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

export { ormConfig };
