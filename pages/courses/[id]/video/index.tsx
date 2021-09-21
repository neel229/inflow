import Link from "next/link";
import { BigNumber } from "ethers";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { Course } from "../../../../utils/interfaces/course";
import fetchCourseById from "../../../api/fetchCourseById";
import VideoPlayer from "../../../../components/VideoPlayer";

type Props = {
  course: Course;
};

const Content = ({ course }: Props) => {
  return (
    <div className="flex flex-row overflow-hidden">
      <nav className=" flex-none w-64">
        <span className="flex font-semibold font-spaceGrotesk text-base px-2 py-2 justify-center bg-radix-sage5">
          Table Of Contents
        </span>
        <ul className=" text-sm list-none flex-1">
          {course.topicsList.map((topic, i) => (
            <li key={i} className="relative list-none">
              <Link href={`/courses/${course.courseId}/video/${i}`}>
                <a
                  className=" block px-3 py-2 w-full text-center border-b border-solid border-r"
                >
                  {topic}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full flex-1">
        <VideoPlayer url={course.previewVideo} />
      </div>
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

export default Content;
