package Models

import (
	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Config"
	_ "gorm.io/driver/sqlite"
)

func GetAllMovies(movie *[]Movies) (err error) {
	if err = Config.DB.Find(movie).Error; err != nil {
		return err
	}
	return nil
}

func CreateAMovie(movie *Movies) (err error) {
	if err = Config.DB.Create(movie).Error; err != nil {
		return err
	}
	return nil
}
