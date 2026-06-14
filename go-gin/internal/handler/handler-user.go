package handler

import (
	"strconv"

	models "github.com/Vasyl-Trefilov/bestBack/internal/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (h *Handler) ListUsers(ctx *gin.Context) {

	users, err := h.srv.ListUsers()

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(201, users)
}

func (h *Handler) CreateUser(ctx *gin.Context) {
	name := uuid.New().String()
	email := name + "@example.com"

	user := &models.User{
		Name:  name,
		Email: email,
	}

	user, err := h.srv.CreateUser(user)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(201, user)
}

func (h *Handler) GetUser(ctx *gin.Context) {
	id := ctx.Param("id")
	idInt, err := strconv.Atoi(id)

	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}
	user, err := h.srv.GetUser(idInt)
	if err != nil {
		ctx.JSON(500, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(200, user)

}

func (h *Handler) UpdateUser(ctx *gin.Context) {
	// update user by id
}

func (h *Handler) DeleteUser(ctx *gin.Context) {
	// delete user by id
}
