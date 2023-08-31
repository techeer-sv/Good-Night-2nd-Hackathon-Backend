import { DataSource } from 'typeorm';
import { Review } from './review.entity';
import { Provider } from '@nestjs/common';

export const reviewProviders: Provider[] = [
  {
    provide: 'REVIEW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Review),
    inject: ['DATA_SOURCE'],
  },
];
