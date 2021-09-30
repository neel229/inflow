import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";
import axios from "axios";
import { Course } from "../../utils/interfaces/course";

const fetchCourseById = async (id: ethers.BigNumber): Promise<Course> => {
  const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;
  const provider = new ethers.providers.JsonRpcProvider(
    `https://ropsten.infura.io/v3/${infuraId}`
  );
  const platform = new ethers.Contract(platformContract, Inflow.abi, provider);

  const data = await platform.getCourseById(id);
  const metadata = await axios.get(data.metadata);
  const course: Course = {
    title: metadata.data.title,
    description: metadata.data.description,
    author: metadata.data.author,
    price: metadata.data.price,
    thumbnail: metadata.data.thumbnail,
    previewVideo: metadata.data.previewVideo,
    topicsList: metadata.data.topicsList,
    videos: metadata.data.videos,
    tags: metadata.data.tags,
    courseId: data.id.toString(),
    authorAddress: data.author,
  };
  return course;
};

export default fetchCourseById;
