package hhs.movie.repository

import hhs.movie.model.Movie
import hhs.movie.model.Review
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReviewRepository : JpaRepository<Review, Long> {

    fun findByMovieAndRatingGreaterThanEqualOrderByCreatedDateDesc(movie: Movie, rating: Double): List<Review>

    fun findByMovieOrderByCreatedDateDesc(movie: Movie): List<Review>

    // 필요한 추가 쿼리 메소드를 여기에 작성할 수 있습니다.
}