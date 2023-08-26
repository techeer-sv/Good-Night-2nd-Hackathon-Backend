package controller

import (
	"github.com/gofiber/fiber/v2"
	"server/domain"
	"server/interfaces/controller/response"
	"server/usecase"
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
