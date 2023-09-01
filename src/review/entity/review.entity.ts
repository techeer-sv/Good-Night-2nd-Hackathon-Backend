import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../../movie/entity/movie.entiity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
