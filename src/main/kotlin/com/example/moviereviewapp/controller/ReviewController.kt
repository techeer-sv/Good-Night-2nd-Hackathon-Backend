package com.example.moviereviewapp.controller

import com.example.moviereviewapp.dto.ReviewDTO
import com.example.moviereviewapp.service.ReviewService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/reviews")
class ReviewController(
    private val reviewService: ReviewService,
) {

    @PostMapping
    fun createReview(@RequestBody reviewDTO: ReviewDTO): ResponseEntity<ReviewDTO> {
        val savedReview = reviewService.createReview(reviewDTO.toEntity())
        return ResponseEntity(savedReview.toDTO(), HttpStatus.CREATED)
    }

    @GetMapping("/movies/{movieId}")
    fun getReviewsByMovie(
        @PathVariable movieId: Long,
        @RequestParam(required = false) minRating: Double?
    ): ResponseEntity<List<ReviewDTO>> {
        val reviews = reviewService.getReviewsByMovie(movieId, minRating)
        return ResponseEntity(reviews, HttpStatus.OK)
    }
}