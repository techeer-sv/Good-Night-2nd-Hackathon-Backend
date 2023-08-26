package movie

import (
	"Good-Night-2nd-Hackathon-Backend/config/database"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

var db = database.GetDB()

func Config(api *gin.RouterGroup) {
	_ = db.DB.AutoMigrate(&Movie{})
	api.POST("/movies", createMovie)
	api.GET("/movies/:id", getMovie)
	api.DELETE("/movies/:id", deleteMovie)
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

func getMovie(c *gin.Context) {
	movieID := c.Param("id")

	var movie Movie
	if err := db.DB.First(&movie, movieID).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "영화를 찾을 수 없습니다."})
		return
	}

	c.JSON(http.StatusOK, movie.fromEntity())
}

func deleteMovie(c *gin.Context) {
	movieID := c.Param("id")

	var movie Movie
	if err := db.DB.First(&movie, movieID).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "영화를 찾을 수 없습니다."})
		return
	}

	if err := db.DB.Model(&movie).Update("deleted_at", time.Now()).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "영화 삭제에 실패하였습니다."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"error": "영화가 삭제되었습니다."})
}
