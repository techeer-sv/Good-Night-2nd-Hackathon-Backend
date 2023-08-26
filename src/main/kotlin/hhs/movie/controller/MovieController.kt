package hhs.movie.controller

import hhs.movie.model.Movie
import hhs.movie.repository.MovieRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/movies")
class MovieController(private val movieRepository: MovieRepository) {

    @GetMapping
    fun getAllMovies(): ResponseEntity<List<Movie>> {
        val movies = movieRepository.findByIsDeletedFalseOrderByReleaseDate()
        return ResponseEntity.ok(movies)
    }

    @PostMapping
    fun createMovie(@RequestBody movie: Movie): ResponseEntity<Movie> {
        val savedMovie = movieRepository.save(movie)
        return ResponseEntity.ok(savedMovie)
    }

    @GetMapping("/{id}")
    fun getMovieById(@PathVariable id: Long): ResponseEntity<Movie> {
        val movie = movieRepository.findById(id)
        return if (movie.isPresent && !movie.get().isDeleted) {
            ResponseEntity.ok(movie.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/{id}")
    fun updateMovie(@PathVariable id: Long, @RequestBody updatedMovie: Movie): ResponseEntity<Movie> {
        return if (movieRepository.existsById(id)) {
            val savedMovie = movieRepository.save(updatedMovie)
            ResponseEntity.ok(savedMovie)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteMovie(@PathVariable id: Long): ResponseEntity<Void> {
        val movie = movieRepository.findById(id)
        if (movie.isPresent) {
            movie.get().isDeleted = true
            movieRepository.save(movie.get())
            return ResponseEntity.ok().build()
        }
        return ResponseEntity.notFound().build()
    }
}