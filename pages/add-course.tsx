import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import { Course } from "../utils/interfaces/course";
import createCourse from "./api/createCourse";

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

const CreateCourse = () => {
  const [metadata, setMetada] = useState<Course>({
    title: "",
    description: "",
    author: "",
    price: "",
    thumbnail: "",
    // previewVideo: "",
    // topicsList: [""],
    videos: [""],
    // tags: [""],
    courseId: null,
    authorAddress: null,
  });

  const handleThumbnail = async (e: any) => {
    const thumbnail = e.target.files[0];
    try {
      const added = await client.add(thumbnail, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setMetada({ ...metadata, thumbnail: url });
    } catch (err) {
      console.log(err);
    }
  };

  const handleVideos = async (e: any) => {
    let fileList: any[] = [];
    let urlList: string[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      fileList.push(e.target.files[i]);
    }
    // upload to IPFS
    try {
      for (let i = 0; i < fileList.length; i++) {
        const added = await client.add(fileList[i], {
          progress: (prog) => console.log(`received ${prog}`),
        });
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        urlList.push(url);
      }
    } catch (err) {
      console.log(err);
    }
    setMetada({ ...metadata, videos: urlList });
  };

  const handleCourse = async () => {
    const { title, description, author, price, thumbnail, videos } = metadata;
    if (
      !title ||
      !description ||
      !author ||
      !price ||
      !thumbnail ||
      !videos.length
    ) {
      return;
    }
    const data = JSON.stringify({
      title,
      description,
      author,
      price,
      thumbnail,
      videos,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const price = ethers.utils.parseUnits(metadata.price, "ether");
      await createCourse(url, price);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          type="text"
          placeholder="Course Title"
          className="mt-8 border rounded p-4"
          onChange={(e) => setMetada({ ...metadata, title: e.target.value })}
        />
        <textarea
          placeholder="Course Description"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            setMetada({ ...metadata, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Author Name"
          className="mt-8 border rounded p-4"
          onChange={(e) => setMetada({ ...metadata, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course Price"
          className="mt-8 border rounded p-4"
          onChange={(e) => setMetada({ ...metadata, price: e.target.value })}
        />
        <input
          type="file"
          name="Thumbnail"
          className="my-4"
          onChange={handleThumbnail}
        />
        {metadata.thumbnail && (
          <img className="rounded mt-4" src={metadata.thumbnail} width="350" />
        )}
        {/* <input
          type="file"
          name="Preview Video"
          className="my-4"
          onChange={handleThumbnail}
        /> */}
        <input />
        <input
          type="file"
          name="Videos"
          className="my-4"
          onChange={handleVideos}
          multiple
        />
        <button
          onClick={handleCourse}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create Course
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;
