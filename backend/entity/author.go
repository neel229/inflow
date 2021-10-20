package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

type Author struct {
	ID            primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Firstname     string             `json:"firstname,omitempty" bson:"firstname,omitempty"`
	Lastname      string             `json:"lastname,omitempty" bson:"lastname,omitempty"`
	Website       string             `json:"website,omitempty" bson:"website,omitempty"`
	Headline      string             `json:"headline,omitempty" bson:"headline,omitempty"`
	Biography     string             `json:"biography,omitempty" bson:"biography,omitempty"`
	Twitter       string             `json:"twitter,omitempty" bson:"twitter,omitempty"`
	LinkedIn      string             `json:"linkedin,omitempty" bson:"linkedin,omitempty"`
	Youtube       string             `json:"youtube,omitempty" bson:"youtube,omitempty"`
	Facebook      string             `json:"facebook,omitempty" bson:"facebook,omitempty"`
	WalletAddress string             `json:"walletAddress,omitempty" bson:"walletAddress,omitempty"`
	ProfilePic    string             `json:"profilePic,omitempty" bson:"profilePic,omitempty"`
}
