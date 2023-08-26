package movie

import (
	"Good-Night-2nd-Hackathon-Backend/config/database"
	"Good-Night-2nd-Hackathon-Backend/review"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time"
)

var db = database.GetDB()

func Config(api *gin.RouterGroup) {
	_ = db.DB.AutoMigrate(&Movie{})
	api.POST("/movies", createMovie)
	api.GET("/movies/:id", getMovie)
	api.DELETE("/movies/:id", deleteMovie)
	api.PUT("/movies/:id", updateMovie)
	api.GET("/movies", getMovies)
	api.GET("/movies-with-avg-rating", getMoviesWithAvgRating)
}

func createMovie(c *gin.Context) {
	var request Request

	if err := c.ShouldBind(&request); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "유효하지 않은 요청입니다."})
		return
	}

	if request.Title == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "제목은 필수 입력값 입니다."})
	}

	m := request.toEntity()

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

func updateMovie(c *gin.Context) {
	movieID := c.Param("id")

	var movie Movie
	if err := db.DB.First(&movie, movieID).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "영화를 찾을 수 없습니다."})
		return
	}

	var request Request

	if err := c.ShouldBind(&request); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "유효하지 않은 요청입니다."})
		return
	}

	movie.Title = request.Title
	movie.Genre = request.Genre
	movie.ReleasedAt = request.ReleasedAt
	movie.EndAt = request.EndAt
	movie.IsShowing = request.ReleasedAt.Before(time.Now()) && request.EndAt.After(time.Now())

	if err := db.DB.Save(&movie).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "영화 정보 수정에 실패하였습니다."})
		return
	}

	c.JSON(http.StatusOK, movie.fromEntity())
}

func getMovies(c *gin.Context) {
	var movies []Movie

	query := db.DB.Order("released_at")

	genre := c.Query("genre")
	if genre != "" {
		query = query.Where("genre = ?", genre)
	}

	showing := c.Query("is_showing")
	if showing != "" {
		query = query.Where("is_showing = ?", showing == "true")
	}

	query.Find(&movies)

	var response []response

	for _, movie := range movies {
		response = append(response, movie.fromEntity())
	}

	c.JSON(http.StatusOK, response)
}

type MovieWithAvgRating struct {
	Movie   response `json:"movie"`
	Average float64  `json:"averageRating"`
}

func getMoviesWithAvgRating(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")
	perPageStr := c.DefaultQuery("perPage", "10")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "유효하지 않은 페이지 번호입니다."})
		return
	}

	perPage, err := strconv.Atoi(perPageStr)
	if err != nil || perPage <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "유효하지 않은 페이지당 아이템 수입니다."})
		return
	}

	var movies []Movie

	query := db.DB.Order("released_at")

	genre := c.Query("genre")
	if genre != "" {
		query = query.Where("genre = ?", genre)
	}

	showing := c.Query("is_showing")
	if showing != "" {
		query = query.Where("is_showing = ?", showing == "true")
	}

	offset := (page - 1) * perPage

	query.Offset(offset).Limit(perPage).Find(&movies)

	var response []MovieWithAvgRating

	for _, movie := range movies {
		var reviews []review.Review
		db.DB.Preload("Reviews").Where("movie_id = ?", movie.ID).Find(&reviews)

		var totalRating float64
		for _, r := range reviews {
			totalRating += r.Rating
		}

		averageRating := 0.0
		if len(reviews) > 0 {
			averageRating = totalRating / float64(len(reviews))
		}

		response = append(response, MovieWithAvgRating{
			Movie:   movie.fromEntity(),
			Average: averageRating,
		})
	}

	c.JSON(http.StatusOK, response)
}
