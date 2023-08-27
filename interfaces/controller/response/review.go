package response

import (
	"github.com/gofiber/fiber/v2"
	"server/domain"
)

type Review struct {
	MovieID int    `json:"movie_id"`
	Rating  int    `json:"rating"`
	Content string `json:"content"`
}

func ReviewSuccessResponse(data *domain.Review, message string) *fiber.Map {
	review := Review{
		MovieID: data.MovieID,
		Rating:  data.Rating,
		Content: data.Content,
	}
	return &fiber.Map{
		"message": message,
		"data":    review,
	}
}

func ReviewsSuccessResponse(data *[]domain.Review, message string) *fiber.Map {
	return &fiber.Map{
		"message": message,
		"data":    data,
	}
}

func ReviewErrorResponse(err error) *fiber.Map {
	return &fiber.Map{
		"error": err.Error(),
	}
}

func ReviewsErrorResponse(err error) *fiber.Map {
	return &fiber.Map{
		"error": err.Error(),
	}
}
