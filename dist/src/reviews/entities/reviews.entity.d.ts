import { Movie } from "src/movies/entities/movie.entity";
export declare class Review {
    id: number;
    rating: number;
    content: string;
    createdAt: Date;
    movie: Movie;
}
