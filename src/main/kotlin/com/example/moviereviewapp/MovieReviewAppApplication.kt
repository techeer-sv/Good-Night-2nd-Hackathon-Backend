package com.example.moviereviewapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MovieReviewAppApplication

fun main(args: Array<String>) {
    runApplication<MovieReviewAppApplication>(*args)
}
