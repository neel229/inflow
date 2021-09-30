import { Course } from "../../utils/interfaces/course";
import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";
import { usdcContract } from "../../utils/config";
import USDC from "../../utils/abis/USDC.json";

const buyCourse = async (
  library: ethers.providers.Web3Provider | undefined,
  account: string,
  course: Course
) => {
  const signer = library?.getSigner();
  let platform = new ethers.Contract(platformContract, Inflow.abi, signer);
  const usdc = new ethers.Contract(usdcContract, USDC.result, signer);
  const price = ethers.utils.parseUnits((parseInt(course.price, 10) * 1e6).toString(), "wei");
  const tx = await usdc.approve(platformContract, price, {from: account});
  await tx.wait()
  try {
    const tx = await platform.purchaseCourse(course.courseId);
    await tx.wait();
  } catch (err) {
    console.log(err);
  }
};

export default buyCourse;
