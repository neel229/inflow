import { Course } from "../../utils/interfaces/course";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { BigNumber } from "ethers";
import fetchCourseById from "../api/fetchCourseById";

type Props = {
  course: Course;
};

const CoursePage = ({ course }: Props) => {
  return (
    <div className="py-12 px-80 flex flex-col">
      <div className="pb-10">
        <img src={course.thumbnail} />
      </div>
      <div className="flex justify-between">
        <div className=" font-semibold font-spaceGrotesk text-2xl flex items-center">
          {course.title}
        </div>
        <button className="bg-radix-indigo4 hover:bg-radix-indigo5 text-center text-radix-indigo11 font-bold py-2 px-4 rounded w-42 text-xl inline-flex items-center">
          Buy Course
        </button>
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
          // previewVideo: "",
          // topicsList: [""],
          videos: [""],
          // tags: [""],
          courseId: null,
          authorAddress: null,
        },
      },
    };
  }
  const courseId = BigNumber.from(id);
  const course = await fetchCourseById(courseId);
  console.log(course);

  return {
    props: {
      course: course,
    },
  };
};

export default CoursePage;
