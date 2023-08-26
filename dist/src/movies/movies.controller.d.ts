import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    createMovie(movieData: Partial<Movie>): Promise<Movie>;
    deleteMovie(id: string): Promise<Movie>;
}
