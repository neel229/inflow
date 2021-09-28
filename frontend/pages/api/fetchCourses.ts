import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";
import axios from "axios";
import { Course } from "../../utils/interfaces/course";

const fetchCourses = async (): Promise<Course[]> => {
  const provider = new ethers.providers.JsonRpcProvider();
  const platform = new ethers.Contract(
    platformContract,
    Inflow.abi,
    provider
  );
  const data = await platform.getCourses();
  const courses: any = await Promise.all(
    data.map(async (c: any) => {
      let metadataURI = c.courseMetadata;
      let metadata: any = await axios.get(metadataURI);
      let price = ethers.utils.formatUnits(c.coursePrice.toString(), "ether");
      let course: Course = {
        title: metadata.data.title,
        description: metadata.data.description,
        author: metadata.data.author,
        price: price,
        thumbnail: metadata.data.thumbnail,
        previewVideo: metadata.data.previewVideo,
        topicsList: metadata.data.topicsList,
        videos: metadata.data.videos,
        tags: metadata.data.tags,
        courseId: c.courseId.toString(),
        authorAddress: c.authorAddress,
      };
      return course;
    })
  );
  return courses;
};

export default fetchCourses;
