package main

import (
	"fmt"

	"github.com/jinzhu/gorm"

	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Config"
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Models"
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Server"
)

var err error

func main() {

	Config.DB, err = gorm.Open("sqlite3", "./gorm.db")

	if err != nil {
		fmt.Println("status: ", err)
	}

	defer Config.DB.Close()

	Config.DB.AutoMigrate(&Models.Movies{})
	Config.DB.AutoMigrate(&Models.Reviews{})

	r := Server.SetUpRouter()
	// running
	r.Run()
}
