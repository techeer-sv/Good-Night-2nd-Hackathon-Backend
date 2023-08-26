/*
Repository
전역적으로 사용하기 위한 함수들의 원형을 정의하는 파일
최대한 관련된 .kt 파일에서만 사용


 */
package hhs.movie.repository

import hhs.movie.model.Review
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReviewRepository : JpaRepository<Review, Long> {
    //JPA Repo, 함수의 이름을 통하여 자동으로 함수 생성
    fun findByMovieIdOrderByCreatedDateDesc(movieId: Long): List<Review>

    fun findByMovieIdAndRatingGreaterThanEqualOrderByCreatedDateDesc(movieId: Long, rating: Double): List<Review>

}
