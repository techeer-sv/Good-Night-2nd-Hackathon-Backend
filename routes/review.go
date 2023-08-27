package routes

import (
	"github.com/gofiber/fiber/v2"
	"server/interfaces/controller"
	"server/usecase"
)

func ReviewRouter(app fiber.Router, usecase usecase.ReviewUsecase) {
	reviewController := controller.NewReviewController(usecase)

	app.Post("/reviews", reviewController.AddReview)
	app.Get("/movies/:movieId/reviews", reviewController.ListReviewsByMovie)
}
