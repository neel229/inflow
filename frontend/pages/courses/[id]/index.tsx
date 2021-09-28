import { Course } from "../../../utils/interfaces/course";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { BigNumber } from "ethers";
import fetchCourseById from "../../api/fetchCourseById";
import VideoPlayer from "../../../components/VideoPlayer";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import buyCourse from "../../api/buyCourses";
import fetchEnrolledCourses from "../../api/fetchEnrolledCourses";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  course: Course;
};

const CoursePage = ({ course }: Props) => {
  const [purchase, setPurchase] = useState(false);
  const { library, active, account } = useWeb3React<Web3Provider>();

  const callFEC = async () => {
    const courses: string[] = await fetchEnrolledCourses(library, account);
    setPurchase(courses.includes(course.courseId));
  };

  useEffect(() => {
    console.log(active);
    if (active) {
      callFEC();
    }
  }, []);

  const router = useRouter();

  const handleWatch = (e: any) => {
    e.preventDefault();
    router.push(`/courses/${course.courseId}/video/0`);
  };

  const handleBuyCourse = async () => {
    if (!active) {
      alert("You need to connect your wallet before buying a course");
      return;
    }
    buyCourse(library, course);
  };

  return (
    <div className="py-12 px-80 flex flex-col">
      <div className="pb-10">
        <VideoPlayer url={course.previewVideo} />
      </div>
      <div className="flex justify-between">
        <div className=" font-semibold font-spaceGrotesk text-2xl flex items-center">
          {course.title} - {course.price} Matic
        </div>
        {purchase ? (
          <button
            className="bg-radix-indigo4 hover:bg-radix-indigo5 text-center text-radix-indigo11 font-bold py-2 px-4 rounded w-42 text-xl inline-flex items-center"
            onClick={handleWatch}
          >
            Watch Course
          </button>
        ) : (
          <button
            className="bg-radix-indigo4 hover:bg-radix-indigo5 text-center text-radix-indigo11 font-bold py-2 px-4 rounded w-42 text-xl inline-flex items-center"
            onClick={handleBuyCourse}
          >
            Buy Course
          </button>
        )}
      </div>
      <div className=" font-inter text-lg py-7">{course.description}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<GetServerSidePropsResult<Props>> => {
  const { id } = context.query;
  if (id === undefined) {
    return {
      props: {
        course: {
          title: "",
          description: "",
          author: "",
          price: "",
          thumbnail: "",
          previewVideo: "",
          topicsList: [""],
          videos: [""],
          tags: [""],
          courseId: null,
          authorAddress: null,
        },
      },
    };
  }
  const courseId = BigNumber.from(id);
  const course = await fetchCourseById(courseId);

  return {
    props: {
      course: course,
    },
  };
};

export default CoursePage;
