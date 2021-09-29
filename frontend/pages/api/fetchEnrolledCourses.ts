import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";

const fetchEnrolledCourses = async (
  library: ethers.providers.Web3Provider | undefined,
) => {
  try {
    const signer = library?.getSigner();
    let platform = new ethers.Contract(platformContract, Inflow.abi, signer);
    const result = await platform.getEnrolledCourses();
    const courses: any = await Promise.all(
      result.map(async (c: any) => {
        const id = ethers.utils.formatUnits(c, "wei");
        return id;
      })
    );
    return courses;
  } catch (err) {
    console.log(err);
  }
};

export default fetchEnrolledCourses;
