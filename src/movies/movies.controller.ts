import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Query,
  Patch,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  //[GET]영화 단일 조회
  @ApiResponse({
    status: 500,
    description: "서버에러!",
  })
  @ApiResponse({
    status: 200,
    description: "성공!",
  })
  @ApiOperation({ summary: "영화 단일 조회" })
  @Get("/:id")
  async getOneMovie(@Param("id") id: string) {
    const getMovie = await this.moviesService.getOneMovie(+id);
    return getMovie;
  }

  //[GET] 영화 목록 조회
  @ApiResponse({
    status: 500,
    description: "서버에러!",
  })
  @ApiResponse({
    status: 200,
    description: "성공!",
  })
  @ApiOperation({ summary: "영화 단일 조회" })
  async getTermMovie(
    @Query("genre") genre: string,
    @Query("isShowing") isShowing: boolean
  ) {
    const filteredAndSortedMovies =
      await this.moviesService.getFilteredAndSortedMovies(genre, isShowing);
    return filteredAndSortedMovies;
  }

  //[CREATE] 영화 등록 API
  @ApiResponse({
    status: 500,
    description: "서버에러!",
  })
  @ApiResponse({
    status: 200,
    description: "성공!",
  })
  @ApiOperation({ summary: "영화등록" })
  @Post()
  async createMovie(@Body() movieData: Partial<Movie>) {
    const createdMovie = await this.moviesService.createMovie(movieData);
    return createdMovie;
  }

  //[UPDATE] 영화 수정 API
  @ApiResponse({
    status: 500,
    description: "서버 에러!",
  })
  @ApiResponse({
    status: 200,
    description: "성공!",
  })
  @ApiOperation({ summary: "영화 수정" })
  @Patch("/:id")
  async updateMovie(
    @Body() movieData: Partial<Movie>,
    @Param("id") id: string
  ) {
    const updatedMovie = await this.moviesService.updateMovie(+id, movieData);
    return updatedMovie;
  }

  //[DELETE] 영화 삭제 API
  @ApiResponse({
    status: 500,
    description: "서버에러!",
  })
  @ApiResponse({
    status: 200,
    description: "성공!",
  })
  @ApiOperation({ summary: "영화삭제" })
  @Delete("/:id")
  async deleteMovie(@Param("id") id: string) {
    const deletedMovie = await this.moviesService.deleteMovie(+id);
    return deletedMovie;
  }
}
