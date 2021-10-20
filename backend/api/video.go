package api

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/neel229/inflow/backend/util"
)

func (s *Server) Upload(ctx context.Context) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		// max size of the input currently set to 4GB
		r.ParseMultipartForm(4 << 30)
		file, handler, err := r.FormFile("myFile")
		if err != nil {
			log.Print(err)
			http.Error(rw, "could not get file", http.StatusBadRequest)
			return
		}
		defer file.Close()
		// create a temp file
		tempfile, err := ioutil.TempFile("files", "upload-*.mp4")
		if err != nil {
			log.Print(err)
			http.Error(rw, "could not create temp file", http.StatusInternalServerError)
			return
		}
		data, err := ioutil.ReadAll(file)
		if err != nil {
			log.Print(err)
			http.Error(rw, "could not read data from the uploaded file", http.StatusBadRequest)
			return
		}
		// write the data received in the tempfile
		tempfile.Write(data)

		accessGrant := "1cCYAHUHkDDVrwGZpPDxP8VrzBmLsF8uQwNzNW3zjbSf3bCzTSaZZRtXsS3RUgJnfo1CCPyPa6U6Jf6oKY8vAv11mNpMe7mSJFnTD9kZpYcW24KexCtCYAtB3xSqFTSGSgXPs8GooTMQwTPqbwtW4SQezMvp8GdgEpwDGt9shKoWvr7HzNudfkMtwcJa4zpvQDR8w6jkGqUmVDmGxaYQ1QA1eENjMoiRQGJuFyX4ksVt9P49PeaCPn7WYEJ1b4pBhT4YawFDtmSy"
		uploadKey := fmt.Sprintf("demo/%s", handler.Filename)
		if err := util.Upload(ctx, accessGrant, "dejavu", uploadKey, tempfile.Name()); err != nil {
			log.Print(err)
			http.Error(rw, "could not upload file", http.StatusInternalServerError)
			return
		}
	}
}
