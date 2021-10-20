package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

// Difficulty represents course difficulty level
type Difficulty int
type Rating int

const (
	Beginner Difficulty = iota + 1
	Intermediate
	Expert
)

const (
	One Rating = iota + 1
	Two
	Three
	Four
	Five
)

// Course represents a course object
type Course struct {
	ID           primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	CourseName   string             `json:"courseName,omitempty" bson:"courseName,omitempty"`
	CourseInfo   CourseInfo         `json:"courseInfo,omitempty" bson:"courseInfo,omitempty"`
	CouseContent []Section          `json:"courseContent,omitempty" bson:"courseContent,omitempty"`
	Thumbnail    string             `json:"thumbnail,omitempty" bson:"thumbnail,omitempty"`
	PreviewVideo string             `json:"previewVideo,omitempty" bson:"previewVideo,omitempty"`
	Author       string             `json:"author,omitempty" bson:"author,omitempty"`
	Price        float64            `json:"price,omitempty" bson:"price,omitempty"`
	Rating       Rating             `json:"rating,omitempty" bson:"rating,omitempty"`
	CourseBuys   int                `json:"courseBuys,omitempty" bson:"courseBuys,omitempty"`
	Tags         string             `json:"tags,omitempty" bson:"tags,omitempty"`
}

// CourseInfo holds a course's information
type CourseInfo struct {
	Objectives    []string   `json:"objectives,omitempty" bson:"objectives,omitempty"`
	PreRequisites []string   `json:"prereq,omitempty" bson:"prereq,omitempty"`
	Difficulty    Difficulty `json:"difficulty,omitempty" bson:"difficulty,omitempty"`
}

// Section represents a course section
type Section struct {
	SectionName string  `json:"sectionName,omitempty" bson:"sectionName,omitempty"`
	Description string  `json:"description,omitempty" bson:"description,omitempty"`
	Video       []Video `json:"videos,omitempty" bson:"videos,omitempty"`
}
