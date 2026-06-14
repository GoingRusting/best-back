package service

import (
	models "github.com/Vasyl-Trefilov/bestBack/internal/models"
	"github.com/Vasyl-Trefilov/bestBack/internal/repository"
)

type Service struct {
	repo *repository.Repository
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) CreateUser(user *models.User) (*models.User, error) {
	userId, err := s.repo.CreateUser(user.Name, user.Email)
	if err != nil {
		return nil, err
	}

	user.ID = userId
	return user, nil
}

func (s *Service) ListUsers() ([]models.User, error) {
	users, err := s.repo.ListUsers()
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (s *Service) GetUser(id int) (models.User, error) {
	user, err := s.repo.GetUser(id)
	if err != nil {
		return models.User{}, err
	}

	return user, nil
}
