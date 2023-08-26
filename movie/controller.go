package movie

import (
	"Good-Night-2nd-Hackathon-Backend/config/database"
	"github.com/gin-gonic/gin"
	"net/http"
)

var db = database.GetDB()

func Config(api *gin.RouterGroup) {
	_ = db.DB.AutoMigrate(&Movie{})
	api.POST("/movies", createMovie)
}

func createMovie(c *gin.Context) {
	var req createRequest

	if err := c.ShouldBind(&req); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "유효하지 않은 요청입니다."})
		return
	}

	m := req.toEntity()

	if err := db.DB.Create(&m).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "영화 등록에 실패하였습니다."})
		return
	}

	c.JSON(http.StatusCreated, m.fromEntity())
}
