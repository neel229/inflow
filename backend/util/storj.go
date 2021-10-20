package util

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os"

	"storj.io/uplink"
)

func Upload(ctx context.Context, accessGrant, bucketName, uploadKey, filename string) error {
	// request access to the satellite
	access, err := uplink.ParseAccess(accessGrant)
	if err != nil {
		return fmt.Errorf("could not request access grant: %v", err)
	}

	// open a project
	project, err := uplink.OpenProject(ctx, access)
	if err != nil {
		return fmt.Errorf("could not open project: %v", err)
	}
	defer project.Close()

	// ensures if the desired bucket exists
	// if the bucket doesn't exists already then
	// it will be created
	_, err = project.EnsureBucket(ctx, bucketName)
	if err != nil {
		return fmt.Errorf("could not ensure bucket: %v", err)
	}

	// initialize upload process
	upload, err := project.UploadObject(ctx, bucketName, uploadKey, nil)
	if err != nil {
		return fmt.Errorf("could not initiate upload: %v", err)
	}

	// copy the data to upload
	data, err := os.ReadFile(filename)
	if err != nil {
		return fmt.Errorf("could not open file: %v", err)
	}
	buf := bytes.NewBuffer(data)
	_, err = io.Copy(upload, buf)
	if err != nil {
		_ = upload.Abort()
		return fmt.Errorf("could not upload data: %v", err)
	}

	// commit the uploaded object.
	err = upload.Commit()
	if err != nil {
		return fmt.Errorf("could not commit uploaded object: %v", err)
	}

	// safe to delete the temp file now
	if err = os.Remove(filename); err != nil {
		return fmt.Errorf("could not delete tempfile: %v", err)
	}
	return nil
}
