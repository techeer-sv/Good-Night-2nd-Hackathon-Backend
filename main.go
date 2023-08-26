package main

import (
	"fmt"

	"github.com/jinzhu/gorm"

	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Config"
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Models"
)

var err error

func main() {
	Config.DB, err = gorm.Open("sqlite3", "./hackathon.db")

	if err != nil {
		fmt.Println("status: ", err)

		defer Config.DB.Close()

		Config.DB.AutoMIgrate(&Models.Movies{})
	}
}
