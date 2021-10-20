package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/mongo"
)

// Server represents a server object
type Server struct {
	db *mongo.Database
	r  *chi.Mux
}

// NewServer creates instance of Server
func NewServer(db *mongo.Database) *Server {
	router := chi.NewRouter()

	return &Server{db: db, r: router}
}

// StartServer starts a server
func (s *Server) StartServer(addr string) {
	fmt.Println("starting server on port " + addr)
	if err := http.ListenAndServe(addr, s.r); err != nil {
		log.Fatal(err)
	}
}
