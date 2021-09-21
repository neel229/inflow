import { ethers } from "ethers";
import { platformContract } from "../../utils/config";
import Platform from "../../artifacts/contracts/Inflow.sol/Platform.json";

const createCourse = async (
  library: ethers.providers.Web3Provider | undefined,
  url: string,
  price: ethers.BigNumber
) => {
  const signer = library?.getSigner();
  let platform = new ethers.Contract(platformContract, Platform.abi, signer);

  const tx = await platform.addCourse(price, url);
  await tx.wait();
};

export default createCourse;
