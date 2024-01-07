/*
Repository
SQL을 조회, ORM 사용

 */
package hhs.movie.repository

import hhs.movie.model.Movie
import hhs.movie.model.Genre
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MovieRepository : JpaRepository<Movie, Long> {

    //JPA Repo, 함수의 이름을 통하여 자동으로 함수 생성
    fun findByIsDeletedFalseOrderByReleaseDate(): List<Movie>

    fun findByGenreAndIsDeletedFalse(genre: Genre): List<Movie>

    fun findByIsShowingAndIsDeletedFalse(isShowing: Boolean): List<Movie>

}
