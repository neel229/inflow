package api

import (
	"context"

	"github.com/go-chi/chi/v5"
)

// SetupRoutes mounts all the routes on the server router
func (s *Server) SetupRoutes() {
	s.r.Post("/video/upload", s.Upload(context.TODO()))
  s.r.Route("/author", func(r chi.Router) {
    r.Post("/", s.createAuthor())
    r.Put("/", s.addAuthorDetails())
    r.Get("/details", s.getAuthorDetails())
  })
}
