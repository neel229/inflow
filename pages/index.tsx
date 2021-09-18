import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Hero from "../components/Hero";
import LatestCourse from "../components/LatestCourses";

const Home = () => {
  const { active } = useWeb3React<Web3Provider>();

  return (
    <>
      {!active ? (
        <>
          <Hero />
          <LatestCourse />
        </>
      ) : (
        <LatestCourse />
      )}
    </>
  );
};

export default Home;
