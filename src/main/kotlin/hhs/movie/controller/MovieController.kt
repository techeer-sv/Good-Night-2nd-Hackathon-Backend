package hhs.movie.controller

import hhs.movie.model.Genre
import hhs.movie.model.Movie
import hhs.movie.service.MovieService
import org.springframework.context.annotation.Description
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/movies")
class MovieController(private val movieService: MovieService) {
    // 영화를 생성하는 API
    @PostMapping
    fun createMovie(@RequestBody movie: Movie): ResponseEntity<Movie> {
        val createdMovie = movieService.createMovie(movie)
        return ResponseEntity.ok(createdMovie)
    }

    // 특정 ID의 영화를 수정하는 API
    @PutMapping("/{movieId}")
    fun updateMovie(@PathVariable movieId: Long, @RequestBody movie: Movie): ResponseEntity<Movie> {
        val updatedMovie = movieService.updateMovie(movie.copy(id = movieId))
        return ResponseEntity.ok(updatedMovie)
    }

    // 특정 ID의 영화를 삭제하는 API
    @DeleteMapping("/{movieId}")
    fun deleteMovie(@PathVariable movieId: Long): ResponseEntity<Void> {
        movieService.deleteMovie(movieId)
        return ResponseEntity.noContent().build()
    }

    // 특정 ID의 영화를 조회하는 API
    @GetMapping("/{movieId}")
    fun getMovieById(@PathVariable movieId: Long): ResponseEntity<Movie> {
        val movie = movieService.findMovieById(movieId)
        return ResponseEntity.ok(movie)
    }

    // 모든 영화를 조회하는 API
    @GetMapping
    fun getAllMovies(): ResponseEntity<List<Movie>> {
        val movies = movieService.findAllMovies()
        return ResponseEntity.ok(movies)
    }

    // 쿼리 파라미터를 사용하여 필터링된 영화를 조회하는 API
    @GetMapping("/filter")
    fun filterMovies(@RequestParam(required = false) genre: Genre?, @RequestParam(required = false) isShowing: Boolean?): ResponseEntity<List<Movie>> {
        val movies = when {
            genre != null -> movieService.findMoviesByGenre(genre)
            isShowing != null -> movieService.findMoviesByShowingStatus(isShowing)
            else -> movieService.findAllMovies()
        }
        return ResponseEntity.ok(movies)
    }

}
