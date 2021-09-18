import { Course } from "../../utils/interfaces/course";
import Web3Modal from "web3modal";
import ethers from "ethers";
import { platformContract } from "../../utils/config";
import Platform from "../../artifacts/contracts/Inflow.sol/Platform.json";

const buyCourse = async (course: Course) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();
  const contract = new ethers.Contract(platformContract, Platform.abi, signer);

  const price = ethers.utils.parseUnits(course.price.toString(), "ether");
  const tx = await contract.purchaseCourse(platformContract, course.courseId, {
    value: price,
  });
  await tx.wait();
};

export default buyCourse;
