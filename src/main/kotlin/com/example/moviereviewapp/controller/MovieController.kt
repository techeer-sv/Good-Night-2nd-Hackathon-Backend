package com.example.moviereviewapp.controller

import com.example.moviereviewapp.domain.Genre
import com.example.moviereviewapp.domain.Movie
import com.example.moviereviewapp.dto.MovieDTO
import com.example.moviereviewapp.dto.MovieWithAvgRatingDTO
import com.example.moviereviewapp.service.MovieService
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.web.PageableDefault
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/movies")
class MovieController(private val movieService: MovieService) {

    @PostMapping
    fun createMovie(@RequestBody movieDTO: MovieDTO): ResponseEntity<MovieDTO> {
        if (movieDTO.title.isBlank()) {
            throw IllegalArgumentException("Movie title cannot be null or empty")
        }

        val savedMovie = movieService.createMovie(movieDTO.toEntity())
        return ResponseEntity(savedMovie.toDTO(), HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getMovieById(@PathVariable id: Long): ResponseEntity<MovieDTO> {
        val movie = movieService.getMovieById(id)
        return ResponseEntity(movie.toDTO(), HttpStatus.OK)
    }

    @GetMapping
    fun getMovies(
        @RequestParam(required = false) genre: Genre?,
        @RequestParam(required = false) isShowing: Boolean?,
        @PageableDefault(size = 2, direction = Sort.Direction.DESC, sort = ["releaseDate"]) pageable: Pageable,
    ): ResponseEntity<Page<MovieWithAvgRatingDTO>> {
        val movies = movieService.getMovies(genre, isShowing, pageable)
        return ResponseEntity(movies, HttpStatus.OK)
    }

    @PutMapping("/{id}")
    fun updateMovie(@PathVariable id: Long, @RequestBody updatedMovie: Movie): ResponseEntity<MovieDTO> {
        val movie = movieService.updateMovie(id, updatedMovie)
        return ResponseEntity(movie.toDTO(), HttpStatus.OK)
    }

    @DeleteMapping("/{id}")
    fun deleteMovie(@PathVariable id: Long): ResponseEntity<Unit> {
        movieService.softDeleteMovie(id)
        return ResponseEntity(HttpStatus.NO_CONTENT)
    }
}