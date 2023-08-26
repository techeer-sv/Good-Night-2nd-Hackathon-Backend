package Controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Models"
)

func GetReviews(c *gin.Context) {
	movieID := c.Query("movieID")
	stars := c.Query("stars")
	var review []Models.Reviews

	err := Models.GetReviewsByID(&review, movieID)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		if stars != "" {
			err := Models.GetReviewsByStars(&review, stars)
			if err != nil {
				c.AbortWithStatus(http.StatusNotFound)
			} else {
				c.JSON(http.StatusOK, review)
			}
		} else {
			c.JSON(http.StatusOK, review)
		}
	}
}

func CreateReview(c *gin.Context) {
	var review Models.Reviews
	c.BindJSON(&review)
	movieId := review.Description
	if movieId == "" {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		err := Models.CreateReview(&review)
		if err != nil {
			c.AbortWithStatus(http.StatusNotFound)
		} else {
			c.JSON(http.StatusOK, review)
		}
	}
}
