import { Movie } from "src/movies/entities/movie.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float", nullable: false })
  rating: number;

  @Column({ type: "text", nullable: false })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;
}
