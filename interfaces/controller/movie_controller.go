package controller

import (
	"server/interfaces/controller/response"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"server/domain"
	"server/usecase"
)

type MovieController struct {
	MovieUsecase usecase.MovieUsecase
}

func NewMovieController(movieUsecase usecase.MovieUsecase) *MovieController {
	return &MovieController{MovieUsecase: movieUsecase}
}

func (c *MovieController) AddMovie(ctx *fiber.Ctx) error {
	var movie domain.Movie
	if err := ctx.BodyParser(&movie); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.MovieErrorResponse(err))
	}

	if err := c.MovieUsecase.AddMovie(&movie); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.MovieErrorResponse(err))
	}

	return ctx.Status(fiber.StatusCreated).JSON(response.MovieSuccessResponse(&movie, "Movie successfully added"))
}

func (c *MovieController) ListMovies(ctx *fiber.Ctx) error {
	options := &domain.RatingQueryOptions{}

	genre := ctx.Query("genre")
	if genre != "" {
		options.Genre = genre
	}

	isShowingStr := ctx.Query("is_showing")
	if isShowingStr != "" {
		isShowing, err := strconv.ParseBool(isShowingStr)
		if err == nil {
			options.IsShowing = &isShowing
		}
	}

	movies, err := c.MovieUsecase.ListMovies(options)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.MoviesErrorResponse(err))
	}

	return ctx.Status(fiber.StatusOK).JSON(response.MoviesSuccessResponse(&movies, "Movies list"))
}

func (c *MovieController) GetMovieById(ctx *fiber.Ctx) error {
	idStr := ctx.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.MovieErrorResponse(err))
	}

	movie, err := c.MovieUsecase.GetMovieById(id)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(response.MovieErrorResponse(err))
	}

	return ctx.Status(fiber.StatusOK).JSON(response.MovieSuccessResponse(&movie, "Movie details"))
}

func (c *MovieController) ListMoviesByRating(ctx *fiber.Ctx) error {
	options := &domain.PaginationOptions{}
	page := ctx.Query("page")
	if page != "" {
		err := ctx.QueryParser(options)
		options.Page, err = strconv.Atoi(page)
		if err != nil {
			options.Page = 1
		}
	}

	pageSize := ctx.Query("pageSize")
	if pageSize != "" {
		err := ctx.QueryParser(options)
		options.PageSize, err = strconv.Atoi(pageSize)
		if err != nil {
			options.PageSize = 10
		}
	}
	movies, err := c.MovieUsecase.ListMoviesByRating(options)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(response.MoviesErrorResponse(err))
	}

	return ctx.Status(fiber.StatusOK).JSON(response.MovieRatingSuccessResponse(movies, "Movies list by rating"))
}

func (c *MovieController) UpdateMovieDetails(ctx *fiber.Ctx) error {
	var movie domain.Movie
	if err := ctx.BodyParser(&movie); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.MovieErrorResponse(err))
	}

	if err := c.MovieUsecase.UpdateMovieDetails(&movie); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.MovieErrorResponse(err))
	}

	return ctx.Status(fiber.StatusOK).JSON(response.MovieSuccessResponse(&movie, "Movie successfully updated"))
}

func (c *MovieController) RemoveMovie(ctx *fiber.Ctx) error {
	idStr := ctx.Params("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(response.MovieErrorResponse(err))
	}

	movie := &domain.Movie{ID: id}
	if err := c.MovieUsecase.RemoveMovie(movie); err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(response.MovieErrorResponse(err))
	}

	return ctx.Status(fiber.StatusNoContent).JSON(fiber.Map{"state": "Movie successfully removed"})
}
