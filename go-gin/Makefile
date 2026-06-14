include .env

run-go:
	@echo "Building..."
	go build -o ./bin/${BINARY_NAME} ./cmd
	@echo "Built!"

	@echo "Starting..."
	PORT=${PORT} PG_HOST=${PG_HOST} PG_PORT=${PG_PORT} PG_USER=${PG_USER} PG_PASS=${PG_PASS} PG_DB=${PG_DB} ./bin/${BINARY_NAME}
	@echo "Started!"