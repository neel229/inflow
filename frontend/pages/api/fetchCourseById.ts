import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";
import axios from "axios";
import { Course } from "../../utils/interfaces/course";

const fetchCourseById = async (id: ethers.BigNumber): Promise<Course> => {
  const provider = new ethers.providers.JsonRpcProvider();
  const platform = new ethers.Contract(
    platformContract,
    Inflow.abi,
    provider
  );

  const data = await platform.getCourseById(id);
  const metadata = await axios.get(data.courseMetadata);
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
    courseId: data.courseId.toString(),
    authorAddress: data.authorAddress,
  };
  return course;
};

export default fetchCourseById;
