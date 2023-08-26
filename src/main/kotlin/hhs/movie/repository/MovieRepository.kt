/*
Repository
전역적으로 사용하기 위한 함수들의 원형을 정의하는 파일
최대한 관련된 .kt 파일에서만 사용


 */
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

}
