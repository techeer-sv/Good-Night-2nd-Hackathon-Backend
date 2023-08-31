import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Review } from '../review/review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'enum', enum: ['스릴러', '로맨스', '코믹', '액션'] })
  genre: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ default: true })
  isShowing: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];

  @Column({ type: 'float', default: 0 })
  averageRating: number;
}
