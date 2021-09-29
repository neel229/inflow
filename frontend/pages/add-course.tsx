import React, { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import { Course } from "../utils/interfaces/course";
import createCourse from "./api/createCourse";
import TagsList from "../components/TagsList";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import SwitchC from "../components/Switch";

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

const CreateCourse = () => {
  const { active, library } = useWeb3React<Web3Provider>();

  const [pvprog, setPvProg] = useState(false);
  const [vprog, setVProg] = useState(false);
  const [metadata, setMetada] = useState<Course>({
    title: "",
    description: "",
    author: "",
    price: "",
    thumbnail: "",
    previewVideo: "",
    topicsList: [""],
    videos: [""],
    tags: [""],
    courseId: null,
    authorAddress: null,
  });
  const [toggle, setToggle] = useState(false);

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

  const handlePreVideo = async (e: any) => {
    const preVideo = e.target.files[0];
    try {
      const added = await client.add(preVideo, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setPvProg(true);
      setMetada({ ...metadata, previewVideo: url });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCSV = async (e: any) => {
    const input = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const result: string = event.target.result;
      const list = result.split(/\r\n|\n/);
      setMetada({ ...metadata, topicsList: list });
    };

    reader.readAsText(input);
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
      setVProg(true);
    } catch (err) {
      console.log(err);
    }
    setMetada({ ...metadata, videos: urlList });
  };

  const handleTags = (tags: string[]) => {
    setMetada({ ...metadata, tags: tags });
  };

  const handleCourse = async () => {
    const {
      title,
      description,
      author,
      price,
      thumbnail,
      previewVideo,
      topicsList,
      videos,
      tags,
    } = metadata;
    if (
      !title ||
      !description ||
      !author ||
      !price ||
      !thumbnail ||
      !videos.length
    ) {
      alert("cannot leave any field empty");
      return;
    } else if (!active) {
      alert("You need to connect wallet before adding course");
      return;
    }
    const data = JSON.stringify({
      title,
      description,
      author,
      price,
      thumbnail,
      previewVideo,
      topicsList,
      videos,
      tags,
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      const price = ethers.utils.parseUnits(metadata.price, "ether");
      await createCourse(library, url, price, toggle);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <div className="flex flex-col">
          <span className=" font-spaceGrotesk font-semibold text-2xl">
            Course Information
          </span>
          <input
            type="text"
            placeholder="Course Title"
            className="mt-8 border rounded p-4"
            onChange={(e) => setMetada({ ...metadata, title: e.target.value })}
          />
          <textarea
            placeholder="Course Description"
            className="t-8 border rounded p-4"
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
        </div>
        <div className="flex flex-col pt-5 py-4">
          <span className=" font-spaceGrotesk text-2xl font-semibold">
            Course Attachments
          </span>
          <div className="flex items-center">
            <span className="font-inter text-lg px-4 flex-1">Upload Thumbnail:</span>
            <input
              type="file"
              name="Thumbnail"
              className="my-4 px-6"
              onChange={handleThumbnail}
            />
            {metadata.thumbnail && (
              <img
                className="rounded mt-4"
                src={metadata.thumbnail}
                width="350"
              />
            )}
          </div>
          <div className="flex items-center">
            <span className="font-inter text-lg px-4 flex-1">
              Upload Preview Video:
            </span>
            <input
              type="file"
              name="Preview Video"
              className="my-4 px-6"
              onChange={handlePreVideo}
            />
            {pvprog && (
              <span>Successfully Uploaded - ✅</span> 
            )}
          </div>
          <div className="flex items-center">
            <span className="font-inter text-lg px-4 flex-1">
              Upload Topics CSV File:
            </span>
            <input
              type="file"
              name="Topics List"
              accept=".csv"
              className="my-4 px-6"
              onChange={handleCSV}
            />
          </div>
          <div className="flex items-center">
            <span className="font-inter text-lg px-4 flex-1">Upload Videos:</span>
            <input
              type="file"
              name="Videos"
              className="my-4 px-6"
              onChange={handleVideos}
              multiple
            />
            {vprog && (
              <span>Successfully Uploaded - ✅</span> 
            )}
          </div>
        </div>
        <div className="py-4">
          <span className=" font-spaceGrotesk text-2xl font-semibold flex-1">
            Add Tags
          </span>
          <TagsList handleTags={handleTags} />
        </div>
        <div className="py-4 flex items-center">
          <span className=" font-spaceGrotesk text-2xl font-semibold flex-1">
            Accept tokens for course:
          </span>
          <SwitchC toggle={toggle} setToggle={setToggle}/>
        </div>
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
