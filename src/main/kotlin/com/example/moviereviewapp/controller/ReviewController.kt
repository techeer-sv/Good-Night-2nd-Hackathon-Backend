package com.example.moviereviewapp.controller

import com.example.moviereviewapp.dto.ReviewDTO
import com.example.moviereviewapp.service.MovieService
import com.example.moviereviewapp.service.ReviewService
import org.springframework.data.crossstore.ChangeSetPersister
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/reviews")
class ReviewController(
    private val reviewService: ReviewService,
    private val movieService: MovieService
) {

    @PostMapping
    fun createReview(@RequestBody reviewDTO: ReviewDTO): ResponseEntity<ReviewDTO> {
        val movie = movieService.getMovieById(reviewDTO.movieId) ?: throw ChangeSetPersister.NotFoundException()
        val savedReview = reviewService.createReview(reviewDTO.toEntity(movie))
        return ResponseEntity(savedReview.toDTO(), HttpStatus.CREATED)
    }
}