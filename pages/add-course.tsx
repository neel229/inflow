import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { platformContract } from "../config";
import Platfrom from "../artifacts/contracts/Inflow.sol/Platform.json";

type CourseItem = {
  title: string;
  description: string;
  author: string;
  price: string;
  thumbnail: string;
  videos: string[];
};

const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

const CreateCourse = () => {
  const [metadata, setMetada] = useState<CourseItem>({
    title: "",
    description: "",
    author: "",
    price: "",
    thumbnail: "",
    videos: [""],
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
      createCourse(url, price);
    } catch (err) {
      console.log(err);
    }
  };
  const createCourse = async (url: string, price: ethers.BigNumber) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let platform = new ethers.Contract(platformContract, Platfrom.abi, signer);
    const tx = await platform.addCourse(price, url);
    await tx.wait();
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
