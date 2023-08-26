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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./movies.service");
const swagger_1 = require("@nestjs/swagger");
let MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async getOneMovie(id) {
        const getMovie = await this.moviesService.getOneMovie(+id);
        return getMovie;
    }
    async getTermMovie(genre, isShowing) {
        const filteredAndSortedMovies = await this.moviesService.getFilteredAndSortedMovies(genre, isShowing);
        return filteredAndSortedMovies;
    }
    async createMovie(movieData) {
        const createdMovie = await this.moviesService.createMovie(movieData);
        return createdMovie;
    }
    async updateMovie(movieData, id) {
        const updatedMovie = await this.moviesService.updateMovie(+id, movieData);
        return updatedMovie;
    }
    async deleteMovie(id) {
        const deletedMovie = await this.moviesService.deleteMovie(+id);
        return deletedMovie;
    }
    async createReview(movieId, rating, content) {
        return this.moviesService.createReview(+movieId, rating, content);
    }
    async getMovieReviews(id, minRating) {
        return this.moviesService.getMovieReviews(id, minRating);
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "서버에러!",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "성공!",
    }),
    (0, swagger_1.ApiOperation)({ summary: "영화 단일 조회" }),
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getOneMovie", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "서버에러!",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "성공!",
    }),
    (0, swagger_1.ApiOperation)({ summary: "영화 단일 조회" }),
    __param(0, (0, common_1.Query)("genre")),
    __param(1, (0, common_1.Query)("isShowing")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getTermMovie", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "서버에러!",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "성공!",
    }),
    (0, swagger_1.ApiOperation)({ summary: "영화등록" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "createMovie", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "서버 에러!",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "성공!",
    }),
    (0, swagger_1.ApiOperation)({ summary: "영화 수정" }),
    (0, common_1.Patch)("/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "updateMovie", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "서버에러!",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "성공!",
    }),
    (0, swagger_1.ApiOperation)({ summary: "영화삭제" }),
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "deleteMovie", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "서버에러!",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "성공!",
    }),
    (0, swagger_1.ApiOperation)({ summary: "리뷰등록" }),
    (0, common_1.Post)("/:id/reviews"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)("rating")),
    __param(2, (0, common_1.Body)("content")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "createReview", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: "서버에러!",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "성공!",
    }),
    (0, swagger_1.ApiOperation)({ summary: "리뷰 목록 조회" }),
    (0, common_1.Get)(":id/reviews"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Query)("minRating")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getMovieReviews", null);
exports.MoviesController = MoviesController = __decorate([
    (0, common_1.Controller)("movies"),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map