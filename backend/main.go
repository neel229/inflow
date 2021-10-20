package main

import (
	"context"
	"log"
	"time"

	"github.com/neel229/inflow/backend/api"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func main() {
	// connect to mongodb cluster
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://neel229:qwertysucks@cluster0.v4csb.mongodb.net/testDB?retryWrites=true&w=majority"))
	if err != nil {
		log.Fatalf("could not create mongo client: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err = client.Connect(ctx); err != nil {
		log.Fatalf("could not connect to mongodb cluster: %v", err)
	}
	defer client.Disconnect(ctx)
	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatalf("could not ping client: %v", err)
	}
	db := client.Database("testDB")

	// create a server struct
	server := api.NewServer(db)
	server.SetupRoutes()
	server.StartServer(":7890")
}
