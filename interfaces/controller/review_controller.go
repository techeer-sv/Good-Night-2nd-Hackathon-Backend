package controller

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"server/domain"
	"server/interfaces/controller/response"
	"server/usecase"
	"strconv"
)

type ReviewController struct {
	ReviewUsecase usecase.ReviewUsecase
}

func NewReviewController(reviewUsecase usecase.ReviewUsecase) *ReviewController {
	return &ReviewController{ReviewUsecase: reviewUsecase}
}

func (c *ReviewController) AddReview(ctx *fiber.Ctx) error {
	var review domain.Review
	if err := ctx.BodyParser(&review); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ReviewErrorResponse(err))
	}

	if err := c.ReviewUsecase.AddReview(&review); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ReviewErrorResponse(err))
	}

	return ctx.Status(fiber.StatusCreated).JSON(response.ReviewSuccessResponse(&review, "Review successfully added"))
}

func (c *ReviewController) ListReviewsByMovie(ctx *fiber.Ctx) error {
	options := &domain.ReviewQueryOptions{}

	ratingStr := ctx.Query("rating", "0")
	movieIdStr := ctx.Params("movieId")

	println(ratingStr)
	if movieIdStr == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ReviewErrorResponse(errors.New("movieId is missing")))
	}

	if rating, err := strconv.ParseFloat(ratingStr, 64); err == nil {
		options.Rating = rating
	} else {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ReviewErrorResponse(err))
	}

	if movieId, err := strconv.ParseInt(movieIdStr, 10, 64); err == nil {
		options.MovieId = int(movieId)
	} else {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.ReviewErrorResponse(err))
	}

	reviews, err := c.ReviewUsecase.ListReviewsByMovie(options)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.ReviewErrorResponse(err))
	}

	return ctx.Status(fiber.StatusOK).JSON(response.ReviewsSuccessResponse(&reviews, "Reviews successfully fetched"))
}
