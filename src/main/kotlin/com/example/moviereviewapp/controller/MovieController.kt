package com.example.moviereviewapp.controller

import com.example.moviereviewapp.dto.MovieDTO
import com.example.moviereviewapp.service.MovieService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/movies")
class MovieController(private val movieService: MovieService) {

    @PostMapping
    fun createMovie(@RequestBody movieDTO: MovieDTO): ResponseEntity<MovieDTO> {
        val savedMovie = movieService.createMovie(movieDTO.toEntity())
        return ResponseEntity(savedMovie.toDTO(), HttpStatus.CREATED)
    }
}