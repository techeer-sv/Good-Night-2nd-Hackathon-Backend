package com.example.moviereviewapp.repository

import com.example.moviereviewapp.domain.Movie
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface MovieRepository : JpaRepository<Movie, Long>, JpaSpecificationExecutor<Movie> {
    fun findByTitle(title: String): Movie?

    fun findByIdAndDeletedIsFalse(id: Long): Optional<Movie>
}