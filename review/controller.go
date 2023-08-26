package review

import (
	"Good-Night-2nd-Hackathon-Backend/config/database"
	"github.com/gin-gonic/gin"
	"net/http"
)

var db = database.GetDB()

func Config(api *gin.RouterGroup) {
	_ = db.DB.AutoMigrate(&Review{})
	api.POST("/reviews", createReview)
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
