import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Inflow from "../../utils/abis/Inflow.json";

const createCourse = async (
  library: ethers.providers.Web3Provider | undefined,
  url: string,
  price: ethers.BigNumber
) => {
  const signer = library?.getSigner();
  let platform = new ethers.Contract(platformContract, Inflow.abi, signer);

  const tx = await platform.createCourse(price, url);
  await tx.wait();
};

export default createCourse;
