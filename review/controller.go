package review

import (
	"Good-Night-2nd-Hackathon-Backend/config/database"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

var db = database.GetDB()

func Config(api *gin.RouterGroup) {
	_ = db.DB.AutoMigrate(&Review{})
	api.POST("/reviews", createReview)
	api.GET("/reviews/:id", getReviews)
}

func createReview(c *gin.Context) {
	var request Request

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "유효하지 않은 요청입니다."})
		return
	}

	r := request.toEntity()

	if err := db.DB.Create(&r).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "리뷰 생성을 실패하였습니다."})
	}

	c.JSON(http.StatusCreated, r.fromEntity())
}

func getReviews(c *gin.Context) {
	movieID := c.Param("id")

	var reviews []Review
	query := db.DB.Order("created_at DESC")

	query = query.Where("movie_id = ?", movieID)

	rating := c.Query("rating")
	if rating != "" {
		rating, err := strconv.ParseFloat(rating, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "유효하지 않은 값입니다."})
			return
		}
		query = query.Where("rating >= ?", rating)
	}

	query.Find(&reviews)

	var response []response

	for _, review := range reviews {
		response = append(response, review.fromEntity())
	}

	c.JSON(http.StatusOK, response)
}
