package Server

import (
	"github.com/gin-gonic/gin"
)

func SetUpRouter() *gin.Engine {
	r := gin.Default()
	v := r.Group("/v1")
	return r
}
