package com.example.moviereviewapp.dto

data class MovieWithAvgRatingDTO(
    val movie: MovieDTO,
    val avgRating: Double?
)