package routes

import (
	"github.com/gofiber/fiber/v2"
	"server/interfaces/controller"
	"server/usecase"
)

func MovieRouter(app fiber.Router, usecase usecase.MovieUsecase) {
	movieController := controller.NewMovieController(usecase)

	app.Post("/movies", movieController.AddMovie)
	app.Get("/movies", movieController.ListMovies)
	app.Get("/movies/:id", movieController.GetMovieById)
	app.Get("/movies-rating", movieController.ListMoviesByRating)
	app.Put("/movies", movieController.UpdateMovieDetails)
	app.Delete("/movies/:id", movieController.RemoveMovie)
}
