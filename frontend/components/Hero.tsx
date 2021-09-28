import Image from "next/image";

const Header = () => {
  return (
    <>
      {/* For Teacher */}
      <section className="px-28 flex space-x-3 py-28 ">
        <div className="px-3 flex w-1/2 flex-col">
          <p>
            <span className="font-extrabold text-5xl font-spaceGrotesk">
              Connecting <br /> Educators and Learners
            </span>
          </p>
          <br />
          <br />
          <p className="font-inter text-gray-500 text-xl py-12">
            <span className="">
              Inflow aims at replacing the traditional ed-tech platform business
              model by migrating to web3. Creators{" "}
              <span className="bg-radix-indigo3 px-1 py-1 rounded-sm font-medium text-radix-indigo11">
                own
              </span>{" "}
              all of their content and{" "}
              <span className="bg-radix-indigo3 px-1 py-1 rounded-sm font-medium text-radix-indigo11">
                {" "}
                gets paid full
              </span>{" "}
              amount, thus, cutting the middle-men out.
            </span>
          </p>
          <div className="flex justify-start">
            <button className="bg-radix-indigo4 hover:bg-radix-indigo5 text-center text-radix-indigo11 font-bold py-2 px-4 rounded w-42 text-xl inline-flex items-center space-x-2">
              <span>Add Course</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center text-center w-1/2">
          Video playback of how Inflow helps teachers
        </div>
      </section>
      {/* For Student */}
      <section className="px-28 flex space-x-3 py-28 ">
        <div className="flex items-center justify-center text-center w-1/2">
          Video playback of how Inflow helps students
        </div>
        <div className="px-3 flex w-1/2 flex-col">
          <p>
            <span className="font-extrabold text-5xl font-spaceGrotesk">
              Rewards <br /> for Learning
            </span>
          </p>
          <br />
          <br />
          <p className="font-inter text-gray-500 text-xl py-12">
            <span>
              At Inflow, a course contains many quiz which will help you test
              the knowledge gained.
              <br />
              <br />
              <span className="bg-radix-violet4 px-1 py-1 rounded-sm font-medium text-radix-violet11">
                {" "}
                Fun Fact:
              </span>{" "}
              Students get rewarded with{" "}
              <span className="px-1 py-1 rounded-sm  text-radix-violet11">
                (Sardine)
              </span>
              {" , "}
              our platform's currency for completing quiz. It can be redeemed to
              get discount on other courses.
            </span>
          </p>
          <div className="flex justify-start">
            <button className="bg-radix-violet4 hover:bg-radix-violet5 text-center text-radix-violet11 font-bold py-2 px-4 rounded w-42 text-xl inline-flex items-center space-x-2">
              <span>Start Learning</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
      <div className="px-28 py-8 w-max h-10">
        <Image src="/wave.svg" height="40" width="1200" />
      </div>
    </>
  );
};

export default Header;
