package main

import (
	"github.com/gin-gonic/gin"

	_ "github.com/mattn/go-sqlite3" // SQLite3 드라이버
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	// 영화 관련 라우터 설정
	movieGroup := r.Group("/movies")
	{
		movieGroup.POST("", createMovie)
		movieGroup.GET("/:id", getMovie)
		movieGroup.GET("", listMovies)
		movieGroup.PUT("/:id", updateMovie)
		movieGroup.DELETE("/:id", deleteMovie)
	}

	// 리뷰 관련 라우터 설정
	reviewGroup := r.Group("/reviews")
	{
		reviewGroup.POST("", createReview)
		reviewGroup.GET("", listReviews)
	}

	return r
}

func main() {
	r := setupRouter()
	r.Run(":8080")
}
