import { ethers } from "ethers";
import { platformContract } from "../../config";
import Platform from "../../artifacts/contracts/Inflow.sol/Platform.json";
import axios from "axios";
import { Course } from "../../interfaces/course";

const fetchCourses = async (): Promise<Course[]> => {
  const provider = new ethers.providers.JsonRpcProvider();
  const platform = new ethers.Contract(
    platformContract,
    Platform.abi,
    provider
  );
  const data = await platform.fetchCourses();
  const courses: any = await Promise.all(
    data.map(async (c: any) => {
      let metadataURI = c.courseMetada;
      let metadata: any = await axios.get(metadataURI);
      let price = ethers.utils.formatUnits(c.coursePrice.toString(), "ether");
      let course: Course = {
        courseId: c.courseId.toString(),
        price: price,
        authorAddress: c.authorAddress,
        thumbnail: metadata.thumbnail,
        title: metadata.title,
        author: metadata.author,
        description: metadata.description,
      };
      return course;
    })
  );
  return courses;
};

export default fetchCourses;
