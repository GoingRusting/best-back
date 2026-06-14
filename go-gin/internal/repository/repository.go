package repository

import (
	"fmt"

	models "github.com/Vasyl-Trefilov/bestBack/internal/models"
	"github.com/jmoiron/sqlx"
)

type Repository struct {
	db *sqlx.DB
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (r *Repository) CreateUser(name, email string) (int, error) {
	var userId int
	err := r.db.QueryRow("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id", name, email).Scan(&userId)
	if err != nil {
		return 0, err
	}
	return userId, nil
}

func (r *Repository) ListUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Select(&users, "SELECT id, name, email FROM users")
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (r *Repository) GetUser(id int) (models.User, error) {
	var user models.User
	err := r.db.Get(&user, "SELECT id, name, email FROM users WHERE id = $1", id)
	if err != nil {
		return models.User{}, err
	}
	fmt.Println(user)
	return user, nil
}
