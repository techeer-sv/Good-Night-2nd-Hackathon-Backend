package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
	"server/database"
	"server/interfaces/repository"
	"server/routes"
	"server/usecase"
)

func main() {
	// Connect with database
	db, err := database.DatabaseConnection()

	if err != nil {
		log.Fatal("Database Connection Error: ", err)
	}
	fmt.Println("Database connection success!:")

	movieRepo := repository.NewMovieRepository(db)
	movieUsecase := usecase.NewMovieUsecase(movieRepo)

	app := fiber.New()

	api := app.Group("/api")
	v1 := api.Group("/v1")

	routes.MovieRouter(v1, movieUsecase)

	log.Fatal(app.Listen(":3000"))
}
