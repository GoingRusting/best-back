package main

import (
	"fmt"
	"os"

	"github.com/Vasyl-Trefilov/bestBack/internal/app"
)

func main() {
	port := os.Getenv("PORT")
	pgHost := os.Getenv("PG_HOST")
	pgPort := os.Getenv("PG_PORT")
	pgUser := os.Getenv("PG_USER")
	pgPass := os.Getenv("PG_PASS")
	pgDBname := os.Getenv("PG_DB")

	fmt.Println("PORT: ", port)
	fmt.Println("PG_HOST: ", pgHost)
	fmt.Println("PG_PORT: ", pgPort)
	fmt.Println("PG_USER: ", pgUser)
	fmt.Println("PG_PASS: ", pgPass)
	fmt.Println("PG_DB_NAME: ", pgDBname)

	pgSettingsString := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable timezone=UTC connect_timeout=5",
		pgHost, pgPort, pgUser, pgPass, pgDBname,
	)

	app, err := app.NewApp(pgSettingsString)
	if err != nil {
		fmt.Println("Error initializing app:", err)
		return
	}

	err = app.Run(port)
	if err != nil {
		fmt.Println("Error running app:", err)
	}
}
