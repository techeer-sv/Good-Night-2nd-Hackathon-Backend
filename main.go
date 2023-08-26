package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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
	reviweRepo := repository.NewReviewRepository(db)
	reviewUsecase := usecase.NewReviewUsecase(reviweRepo)

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "localhost:8080",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	api := app.Group("/api")
	v1 := api.Group("/v1")

	routes.MovieRouter(v1, movieUsecase)
	routes.ReviewRouter(v1, reviewUsecase)

	log.Fatal(app.Listen(":8080"))
}
