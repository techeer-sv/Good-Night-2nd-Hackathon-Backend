package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
	"server/database"
)

func main() {
	// Connect with database
	db, err := database.DatabaseConnection()

	if err != nil {
		log.Fatal("Database Connection Error: ", err)
	}
	fmt.Println("Database connection success!:", db)

	app := fiber.New()

	app.Get("/ping", func(c *fiber.Ctx) error {
		return c.SendString("Pingpong by fiber\n")
	})

	log.Fatal(app.Listen(":3000"))
}
