package Models

import (
	"math"
	"strconv"

	"github.com/printSANO/Good-Night-2nd-Hackathon-Backend/Config"
	_ "gorm.io/driver/sqlite"
)

func GetAllMovies(movie *[]Movies) (err error) {
	if err := Config.DB.Where("is_delete = ?", false).Order("start ASC").Find(movie).Error; err != nil {
		return err
	}
	return nil
}

func GetAMovie(movie *Movies, id string) (err error) {
	if err := Config.DB.Where("id = ?", id).First(movie).Error; err != nil {
		return err
	}
	if err := Config.DB.Where("movie_id = ?", id).Find(&movie.Reviews).Error; err != nil {
		return err
	}
	return nil
}

func GetAverageRating(reviews []Reviews, movieID string) (float64, error) {
	var avgRating float64
	var d float64
	if err := Config.DB.Where("movie_id = ?", movieID).Find(&reviews).Error; err != nil {
		return 0, err
	}
	for i, star := range reviews {
		avgRating = avgRating + star.Rating
		d = float64(i)
	}
	avgRating = avgRating / d
	return math.Round(avgRating*10) / 10, nil
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
	if err := Config.DB.Create(movie).Error; err != nil {
		return err
	}
	return nil
}

func DeleteAMovie(movie *Movies, id string) (err error) {
	if err := Config.DB.Model(movie).Where("is_delete = ?", false).Update("is_delete", true).Error; err != nil {
		return err
	}
	return nil
}

func UpdateAMovie(movie *Movies, id string) (err error) {
	Config.DB.Where("is_delete = ?", false).Save(movie)
	return nil
}
