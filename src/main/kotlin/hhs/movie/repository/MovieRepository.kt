package hhs.movie.repository

import hhs.movie.model.Movie
import hhs.movie.model.Genre
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MovieRepository : JpaRepository<Movie, Long> {

    fun findByIsDeletedFalseOrderByReleaseDate(): List<Movie>

    fun findByGenreAndIsDeletedFalse(genre: Genre): List<Movie>

    fun findByIsShowingAndIsDeletedFalse(isShowing: Boolean): List<Movie>

    // 필요한 추가 쿼리 메소드를 여기에 작성할 수 있습니다.
}