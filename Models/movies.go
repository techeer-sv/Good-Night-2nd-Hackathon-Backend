package Models

import (
	"strconv"

	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Config"
	_ "gorm.io/driver/sqlite"
)

func GetAllMovies(movie *[]Movies) (err error) {
	if err = Config.DB.Where("is_delete = ?", false).Order("start ASC").Find(movie).Error; err != nil {
		return err
	}
	return nil
}

func GetAMovie(movie *Movies, id string) (err error) {
	if err := Config.DB.Where("id = ?", id).First(movie).Error; err != nil {
		return err
	}
	return nil
}

func GetMoviesByGenre(movie *[]Movies, genre string) (err error) {
	if err := Config.DB.Where("genre = ?", genre).Order("start ASC").Find(movie).Error; err != nil {
		return err
	}
	return nil
}

func GetMoviesByActive(movie *[]Movies, active string) (err error) {
	b, err := strconv.ParseBool(active)
	if err != nil {
		return err
	}
	if err := Config.DB.Where("active = ?", b).Order("start ASC").Find(movie).Error; err != nil {
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

func DeleteAMovie(movie *Movies, id string) (err error) {
	Config.DB.Model(movie).Where("is_delete = ?", false).Update("is_delete", true)
	return nil
}

func UpdateAMovie(movie *Movies, id string) (err error) {
	Config.DB.Where("is_delete = ?", false).Save(movie)
	return nil
}
