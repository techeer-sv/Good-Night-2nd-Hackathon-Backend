package repository

import (
	"backend/models"
	"errors"
)

type InMemoryMovieRepository struct {
	movies []*models.Movie
	nextID int
}

func NewInMemoryMovieRepository() MovieRepository {
	return &InMemoryMovieRepository{
		movies: make([]*models.Movie, 0),
		nextID: 1,
	}
}

func (repo *InMemoryMovieRepository) Create(movie *models.Movie) error {
	movie.ID = repo.nextID
	repo.movies = append(repo.movies, movie)
	repo.nextID++
	return nil
}

func (repo *InMemoryMovieRepository) Delete(id int) error {
	for index, movie := range repo.movies {
		if movie.ID == id {
			repo.movies = append(repo.movies[:index], repo.movies[index+1:]...)
			return nil
		}
	}
	return errors.New("movie not found")
}

func (repo *InMemoryMovieRepository) Update(movie *models.Movie) error {
	for index, m := range repo.movies {
		if m.ID == movie.ID {
			repo.movies[index] = movie
			return nil
		}
	}
	return errors.New("movie not found")
}

func (repo *InMemoryMovieRepository) GetByID(id int) (*models.Movie, error) {
	for _, movie := range repo.movies {
		if movie.ID == id {
			return movie, nil
		}
	}
	return nil, errors.New("movie not found")
}

func (repo InMemoryMovieRepository) GetAll() ([]*models.Movie, error) {
	return repo.movies, nil
}
