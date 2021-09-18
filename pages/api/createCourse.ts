import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { platformContract } from "../../utils/config";
import Platform from "../../artifacts/contracts/Inflow.sol/Platform.json";

const createCourse = async (url: string, price: ethers.BigNumber) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let platform = new ethers.Contract(platformContract, Platform.abi, signer);
  const tx = await platform.addCourse(price, url);
  await tx.wait();
};

export default createCourse;
