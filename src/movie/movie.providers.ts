import { DataSource } from 'typeorm';
import { Movie } from './movie.entity';
import { Provider } from '@nestjs/common';

export const movieProviders: Provider[] = [
  {
    provide: 'MOVIE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Movie),
    inject: ['DATA_SOURCE'],
  },
];
