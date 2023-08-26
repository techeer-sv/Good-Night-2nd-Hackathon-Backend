// eslint-disable-next-line prettier/prettier
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Movie } from '../../movie/domain/movie.entity';
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  review: string;

  @ManyToOne(() => Movie)
  movie: Movie;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date | null;
}
