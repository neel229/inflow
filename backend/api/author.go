package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/neel229/inflow/backend/entity"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type createAuthorReq struct {
	WalletAddress string `json:"walletAddress,omitempty" bson:"walletAddress,omitempty"`
}

// createAuthor adds a new author entry in the database
func (s *Server) createAuthor() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		// get author collection
		ac := s.db.Collection("authors")
		// get walletAddress from the req body
		data := new(createAuthorReq)
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			log.Print(err)
			http.Error(rw, "could not decode request body data", http.StatusBadRequest)
			return
		}
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		// create a new author entry
		res, err := ac.InsertOne(ctx, data)
		if err != nil {
			log.Print(err)
			http.Error(rw, "could not create author", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(rw).Encode(res)
	}
}

type addDetailsReq struct {
	Firstname string `json:"firstname,omitempty" bson:"firstname,omitempty"`
	Lastname  string `json:"lastname,omitempty" bson:"lastname,omitempty"`
	Website   string `json:"website,omitempty" bson:"website,omitempty"`
	Headline  string `json:"headline,omitempty" bson:"headline,omitempty"`
	Biography string `json:"biography,omitempty" bson:"biography,omitempty"`
	Twitter   string `json:"twitter,omitempty" bson:"twitter,omitempty"`
	LinkedIn  string `json:"linkedin,omitempty" bson:"linkedin,omitempty"`
	Youtube   string `json:"youtube,omitempty" bson:"youtube,omitempty"`
	Facebook  string `json:"facebook,omitempty" bson:"facebook,omitempty"`
}

// addAuthorDetails updates an author account's details
func (s *Server) addAuthorDetails() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		// get author collection
		ac := s.db.Collection("authors")
		// get object id from request params
		param := r.URL.Query().Get("id")
		log.Println(param)
		// get data from the req body
		data := new(addDetailsReq)
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			log.Print(err)
			http.Error(rw, "could not parse req body data", http.StatusBadRequest)
			return
		}
		// check if the author exists
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		objectID, err := primitive.ObjectIDFromHex(param)
		if err != nil {
			log.Print(err)
			http.Error(rw, "invalid id provided", http.StatusBadRequest)
			return
		}
		var author entity.Author
		if err = ac.FindOne(ctx, bson.D{
			primitive.E{Key: "_id", Value: objectID},
		}).Decode(&author); err != nil {
			if err == mongo.ErrNoDocuments {
				log.Print(err)
				http.Error(rw, "could not find account with given id, try creating new account", http.StatusBadRequest)
				return
			}
		}
		res, err := ac.UpdateByID(ctx, objectID, bson.D{
			bson.E{Key: "$set", Value: bson.D{
				bson.E{Key: "firstname", Value: data.Firstname},
				bson.E{Key: "lastname", Value: data.Lastname},
				bson.E{Key: "website", Value: data.Website},
				bson.E{Key: "headline", Value: data.Headline},
				bson.E{Key: "biography", Value: data.Biography},
				bson.E{Key: "twitter", Value: data.Twitter},
				bson.E{Key: "youtube", Value: data.Youtube},
				bson.E{Key: "linkedin", Value: data.LinkedIn},
				bson.E{Key: "facebook", Value: data.Facebook},
			},
			}})
		if err != nil {
			log.Print(err)
			http.Error(rw, "could not update details", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(rw).Encode(res)
	}
}

type getAuthorDetailsReq struct {
	WalletAddress string `json:"walletAddress" bson:"walletAddress"`
}

// getAuthorDetails fetches an author account based off his wallet address
func (s *Server) getAuthorDetails() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		// get author collection
		ac := s.db.Collection("authors")
		// get walletAddr from req body
		data := new(getAuthorDetailsReq)
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			log.Print(err)
			http.Error(rw, "could not parse request body", http.StatusBadRequest)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var author entity.Author
		if err := ac.FindOne(ctx, bson.D{bson.E{Key: "walletAddress", Value: data.WalletAddress}}).Decode(&author); err != nil {
			if err == mongo.ErrNoDocuments {
				http.Error(rw, "there are no author ids with matching wallet address", http.StatusBadRequest)
				return
			}
			log.Print(err)
			http.Error(rw, "there was an error retreiving author data", http.StatusInternalServerError)
			return
		}
		json.NewEncoder(rw).Encode(author)
	}
}
