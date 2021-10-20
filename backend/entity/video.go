package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type State int

const (
	Processing State = iota + 1
	Uploaded
)

type Video struct {
	ID         primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name       string             `json:"name,omitempty" bson:"name,omitempty"`
	State      State              `json:"state,omitempty" bson:"state,omitempty"`
	UploadedAt time.Duration      `json:"uploadedAt,omitempty" bson:"uploadedAt,omitempty"`
}
