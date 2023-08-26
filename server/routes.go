package Server

import (
	"github.com/gin-gonic/gin"
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Controllers"
)

func SetUpRouter() *gin.Engine {
	r := gin.Default()
	v1 := r.Group("/v1")
	{
		v1.GET("movie", Controllers.GetMovies)
		v1.POST("movie", Controllers.CreateAMovie)
		v1.DELETE("movie", Controllers.DeleteAMovie)
		v1.PUT("movie", Controllers.UpdateAMovie)
	}
	return r
}
