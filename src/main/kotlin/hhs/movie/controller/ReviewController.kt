package hhs.movie.controller

import hhs.movie.model.Review
import hhs.movie.repository.MovieRepository
import hhs.movie.repository.ReviewRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/reviews")
class ReviewController(private val reviewRepository: ReviewRepository, private val movieRepository: MovieRepository) {

    @PostMapping
    fun createReview(@RequestBody review: Review): ResponseEntity<Review> {
        val savedReview = reviewRepository.save(review)
        return ResponseEntity.ok(savedReview)
    }

    @GetMapping("/movie/{movieId}")
    fun getReviewsForMovie(@PathVariable movieId: Long): ResponseEntity<List<Review>> {
        val movie = movieRepository.findById(movieId).orElse(null)
        if (movie != null) {
            val reviews = reviewRepository.findByMovieOrderByCreatedDateDesc(movie)
            return ResponseEntity.ok(reviews)
        }
        return ResponseEntity.notFound().build()
    }

    // 추가적인 리뷰 관련 API를 여기에 작성하세요.
}
