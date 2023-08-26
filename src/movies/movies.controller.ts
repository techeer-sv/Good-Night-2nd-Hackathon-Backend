import { Controller, Post, Body } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

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
}
