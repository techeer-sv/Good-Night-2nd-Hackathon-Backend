package services

import (
	"backend/models"
	"backend/repository"
)

type MovieService struct {
	Repo repository.MovieRepository
}

func NewMovieService(repo repository.MovieRepository) *MovieService {
	return &MovieService{Repo: repo}
}

func (s *MovieService) CreateMovie(movie *models.Movie) error {
	return s.Repo.Create(movie)
}

func (s *MovieService) GetByID(id int) (*models.Movie, error) {
	return s.Repo.GetByID(id)
}

func (s *MovieService) GetAll() ([]*models.Movie, error) {
	return s.Repo.GetAll()
}

func (s *MovieService) UpdateMovie(movie *models.Movie) error {
	return s.Repo.Update(movie)
}

func (s *MovieService) DeleteMovie(id int) error {
	return s.Repo.Delete(id)
}
