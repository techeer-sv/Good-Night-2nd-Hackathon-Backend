package hhs.movie.controller

import hhs.movie.model.Review
import hhs.movie.service.ReviewService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/reviews")
class ReviewController(private val reviewService: ReviewService) {

    // 영화에 대한 리뷰를 등록하는 API
    @PostMapping
    fun createReview(@RequestBody review: Review): ResponseEntity<Review> {
        val createdReview = reviewService.createReview(review)
        return ResponseEntity.ok(createdReview)
    }

    // 특정 리뷰 평점 이상으로만 조회하는 API
    @GetMapping("/movie/{movieId}")
    fun getReviewsForMovie(@PathVariable movieId: Long, @RequestParam(required = false) minRating: Double?): ResponseEntity<List<Review>> {
        val reviews = if (minRating != null) {
            reviewService.findReviewsByMovieIdWithRatingThreshold(movieId, minRating)
        } else {
            reviewService.findReviewsByMovieId(movieId)
        }
        return ResponseEntity.ok(reviews)
    }

}
