package Controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Models"
)

func GetMovies(c *gin.Context) {
	id := c.Query("id")
	genre := c.Query("genre")
	active := c.Query("active")
	switch {
	case id != "":
		var movie Models.Movies
		err := Models.GetAMovie(&movie, id)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			var reviews []Models.Reviews
			err := Models.GetReviewsByID(&reviews, id)
			if err != nil {
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}
			avgStars, err := Models.GetAverageRating(reviews, id)
			if err != nil {
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}
			movie.AvgRating = avgStars
			c.JSON(http.StatusOK, movie)
		}
	case genre != "" && active != "":
		var movie []Models.Movies
		err := Models.GetMoviesByGenre(&movie, genre)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		}
		err = Models.GetMoviesByActive(&movie, active)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, movie)
		}
	case genre != "":
		var movie []Models.Movies
		err := Models.GetMoviesByGenre(&movie, genre)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, movie)
		}
	case active != "":
		var movie []Models.Movies
		err := Models.GetMoviesByActive(&movie, active)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, movie)
		}
	default:
		var movie []Models.Movies
		err := Models.GetAllMovies(&movie)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, movie)
		}
	}
}

func CreateAMovie(c *gin.Context) {
	var movie Models.Movies
	c.BindJSON(&movie)
	title := movie.Title
	if title == "" {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		err := Models.CreateAMovie(&movie)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, movie)
		}
	}
}

func DeleteAMovie(c *gin.Context) {
	var movie Models.Movies
	id := c.Query("id")
	err := Models.GetAMovie(&movie, id)
	if err != nil {
		c.JSON(http.StatusNotFound, movie)
	}
	c.BindJSON(&movie)
	err = Models.DeleteAMovie(&movie, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, movie)
	}
}

func UpdateAMovie(c *gin.Context) {
	var movie Models.Movies
	id := c.Query("id")
	err := Models.GetAMovie(&movie, id)
	if err != nil {
		c.JSON(http.StatusNotFound, movie)
	}
	c.BindJSON(&movie)
	err = Models.UpdateAMovie(&movie, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, movie)
	}
}

func GetMoviesByGenre(c *gin.Context) {
	var movie []Models.Movies
	genre := c.Query("id")
	err := Models.GetMoviesByGenre(&movie, genre)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, movie)
	}

}
