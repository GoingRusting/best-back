package repository

import (
	"log"

	"github.com/jmoiron/sqlx"
)

func NewPostgresDB(configDB string) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", configDB)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	log.Println("Connected to PostgreSQL database successfully!")

	return db, nil
}
