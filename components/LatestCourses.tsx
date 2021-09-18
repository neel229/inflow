import { useEffect, useState } from "react";
import { Course } from "../utils/interfaces/course";
import fetchCourses from "../pages/api/fetchCourses";
import Link from "next/link";

const LatestCourse = () => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    callFetchCourse();
  }, []);

  const callFetchCourse = async () => {
    const courses = await fetchCourses();
    setCourse(courses);
    setLoading(true);
  };

  return (
    <div className="px-28 py-28 flex flex-col">
      <div className="flex">
        <div>
          <span className="font-spaceGrotesk font-bold text-5xl">
            Latest Courses
          </span>
        </div>
      </div>
      <div className="py-14">
        {loading && !course.length ? (
          <div
            className="bg-radix-tomato4 border border-radix-tomato8 text-radix-tomato11 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline font-semibold font-spaceGrotesk">
              Seems like there aren't any courses published yet. Check back
              later!
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        ) : (
          course.map((c, i) => (
            <Link href={`/courses/${c.courseId}`}>
              <a>
                <div
                  className="max-w-sm rounded overflow-hidden hover:shadow-lg border-2 border-black cursor-pointer"
                  key={i}
                >
                  <img
                    className="w-full"
                    src={c.thumbnail}
                    alt="Course Thumbnail"
                  />
                  <div className="px-6 py-2">
                    <div className="font-bold text-xl overflow-hidden">
                      {c.title}
                    </div>
                    <p className="text-gray-700 text-base truncate">
                      {c.description}
                    </p>
                  </div>
                  <div className="px-6 flex justify-between py-2 font-bold">
                    <p className="text-gray-700 text-base overflow-hidden">
                      <span className="font-spaceGrotesk font-semibold bg-radix-indigo3 text-radix-indigo11 px-1 py-1 rounded">
                        Author:
                      </span>
                      {" " + c.author}
                    </p>
                    <p className="text-gray-700 text-base overflow-hidden">
                      <span className="font-spaceGrotesk font-semibold bg-radix-indigo3 text-radix-indigo11 px-1 py-1 rounded">
                        Price:
                      </span>
                      {" " + c.price}
                    </p>
                  </div>
                  {/* <div className="px-6 pt-4 pb-2">
                    {c.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div> */}
                </div>
              </a>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestCourse;
