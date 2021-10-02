import { Course } from "../../utils/interfaces/course";
import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";
import { usdcContract } from "../../utils/config";
import USDC from "../../utils/abis/USDC.json";
import Sardine from "../../utils/abis/Sardine.json";
import { sardineContract } from "../../utils/config";

const buyCourseWithSardine = async (
  library: ethers.providers.Web3Provider | undefined,
  account: string,
  course: Course
) => {
  const signer = library?.getSigner();
  const platform = new ethers.Contract(platformContract, Inflow.abi, signer);
  const usdc = new ethers.Contract(usdcContract, USDC.result, signer);
  const sardine = new ethers.Contract(sardineContract, Sardine.abi, signer);
  const price = ethers.utils.parseUnits((parseInt(course.price, 10) * 1e6 * 0.7).toString(), "wei");
  const price2 = ethers.utils.parseUnits((parseInt(course.price, 10) * 1e6 * 0.3).toString(), "wei");
  const tx = await usdc.approve(platformContract, price, {from: account});
  await tx.wait()
  const tx1 = await sardine.approve(platformContract, price2, {from: account});
  await tx1.wait()
  try {
    const tx = await platform.purchaseWithSardine(course.courseId);
    await tx.wait();
  } catch (err) {
    console.log(err);
  }
};

export default buyCourseWithSardine;

