type Props = {
  toggle: any,
  setToggle: any,
}

const Switch = ({toggle, setToggle}: Props) => {
  const toggleClass = "transform translate-x-5";
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
      {toggle ? (<>
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-radix-grass6 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div
            className={
              "bg-radix-gray12 md:w-5 md:h-5 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? toggleClass : null)
            }
          ></div>
        </div>
      </>) : (<>
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-radix-tomato6 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div
            className={
              "bg-black md:w-5 md:h-5 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? toggleClass : null)
            }
          ></div>
        </div>
      </>)}
      </div>
    </>
  );
};

export default Switch;
