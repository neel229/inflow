import { Course } from "../../utils/interfaces/course";
import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";

const buyCourse = async (
  library: ethers.providers.Web3Provider | undefined,
  course: Course
) => {
  const signer = library?.getSigner();
  let platform = new ethers.Contract(platformContract, Inflow.abi, signer);

  const price = ethers.utils.parseUnits(course.price.toString(), "ether");
  const tx = await platform.purchaseCourse(course.courseId, {
    value: price,
  });
  await tx.wait();
};

export default buyCourse;
