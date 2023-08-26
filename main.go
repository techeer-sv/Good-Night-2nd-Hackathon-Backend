package main

import (
	"Good-Night-2nd-Hackathon-Backend/movie"
	"Good-Night-2nd-Hackathon-Backend/review"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	v1 := r.Group("/api/v1")
	movie.Config(v1)
	review.Config(v1)
	_ = r.Run(":8080")
}
