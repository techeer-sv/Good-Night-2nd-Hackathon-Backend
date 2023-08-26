package Controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Models"
)

func GetMovies(c *gin.Context) {
	var movie []Models.Movies
	err := Models.GetAllMovies(&movie)

	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, movie)
	}

}

func CreateAMovie(c *gin.Context) {
	var movie Models.Movies
	c.BindJSON(&movie)
	err := Models.CreateAMovie(&movie)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, movie)
	}
}
