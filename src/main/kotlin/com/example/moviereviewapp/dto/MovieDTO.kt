package com.example.moviereviewapp.dto

import com.example.moviereviewapp.domain.Genre
import com.example.moviereviewapp.domain.Movie
import java.time.LocalDate

data class MovieDTO(
    val id: Long?,
    val title: String,
    val genre: Genre,
    val releaseDate: LocalDate,
    val endDate: LocalDate,
    val isShowing: Boolean
) {
    fun toEntity(): Movie {
        return Movie(
            id = id,
            title = title,
            genre = genre,
            releaseDate = releaseDate,
            endDate = endDate,
            isShowing = isShowing
        )
    }
}