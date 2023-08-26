"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("./entities/movie.entity");
const typeorm_2 = require("typeorm");
const reviews_entity_1 = require("../reviews/entities/reviews.entity");
let MoviesService = class MoviesService {
    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }
    async getOneMovie(id) {
        const movie = await this.movieRepository.findOne({ where: { id } });
        if (!movie) {
            throw new common_1.NotFoundException("영화를 찾을 수 없습니다.");
        }
        return movie;
    }
    async getFilteredAndSortedMovies(genre, isShowing) {
        let query = this.movieRepository.createQueryBuilder("movie");
        if (genre) {
            query = query.andWhere("movie.genre = :genre", { genre });
        }
        if (isShowing !== undefined) {
            query = query.andWhere("movie.isShowing = :isShowing", { isShowing });
        }
        query = query.orderBy("movie.releaseDate", "DESC");
        const movies = await query.getMany();
        return movies;
    }
    async createMovie(movieData) {
        const movie = this.movieRepository.create(movieData);
        return this.movieRepository.save(movie);
    }
    async updateMovie(id, movieData) {
        const existingMovie = await this.movieRepository.findOne({ where: { id } });
        if (!existingMovie) {
            return undefined;
        }
        Object.assign(existingMovie, movieData);
        const updatedMovie = await this.movieRepository.save(existingMovie);
        return updatedMovie;
    }
    async deleteMovie(id) {
        const movie = await this.movieRepository.findOne({ where: { id } });
        if (!movie) {
            throw new common_1.NotFoundException("영화를 찾을 수 없습니다.");
        }
        await this.movieRepository.remove(movie);
        return movie;
    }
    async createReview(movieId, rating, content) {
        const movie = await this.movieRepository.findOne({
            where: { id: movieId },
        });
        if (!movie) {
            throw new common_1.NotFoundException("Movie not found");
        }
        const review = new reviews_entity_1.Review();
        review.rating = rating;
        review.content = content;
        review.movie = movie;
        return this.reviewRepository.save(review);
    }
    async getMovieReviews(movieId, minRating) {
        const reviews = await this.reviewRepository.find({
            where: {
                id: movieId,
                rating: minRating ? (0, typeorm_2.MoreThanOrEqual)(minRating) : (0, typeorm_2.MoreThanOrEqual)(0),
            },
            order: {
                createdAt: "DESC",
            },
        });
        return reviews;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map