import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { Review } from "src/reviews/entities/reviews.entity";
export declare class MoviesService {
    private readonly movieRepository;
    constructor(movieRepository: Repository<Movie>);
    private readonly reviewRepository;
    getOneMovie(id: number): Promise<Movie>;
    getFilteredAndSortedMovies(genre: string, isShowing: boolean): Promise<Movie[]>;
    createMovie(movieData: Partial<Movie>): Promise<Movie>;
    updateMovie(id: number, movieData: Partial<Movie>): Promise<Movie | undefined>;
    deleteMovie(id: number): Promise<Movie>;
    createReview(movieId: number, rating: number, content: string): Promise<Review>;
}
