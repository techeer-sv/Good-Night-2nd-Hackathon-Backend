package response

import (
	"github.com/gofiber/fiber/v2"
	"server/domain"
	"time"
)

type Movie struct {
	Title       string     `json:"title"`
	Genre       string     `json:"genre"`
	ReleaseDate *time.Time `json:"release_date"`
	EndDate     *time.Time `json:"end_date"`
	IsShowing   bool       `json:"is_showing"`
}

func MovieSuccessResponse(data *domain.Movie, message string) *fiber.Map {
	movie := Movie{
		Title:       data.Title,
		Genre:       data.Genre,
		ReleaseDate: data.ReleaseDate,
		EndDate:     data.EndDate,
		IsShowing:   data.IsShowing,
	}
	return &fiber.Map{
		"state": message,
		"data":  movie,
	}
}

func MovieRatingSuccessResponse(data []domain.MovieWithRating, message string) *fiber.Map {
	return &fiber.Map{
		"state": message,
		"data":  data,
	}
}

func MoviesSuccessResponse(data *[]domain.Movie, message string) *fiber.Map {
	return &fiber.Map{
		"state": message,
		"data":  data,
	}
}

func MovieErrorResponse(err error) *fiber.Map {
	return &fiber.Map{
		"error": err.Error(),
	}
}

func MoviesErrorResponse(err error) *fiber.Map {
	return &fiber.Map{
		"error": err.Error(),
	}
}
