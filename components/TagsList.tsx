import React, { useState } from "react";

const TagsList = ({ handleTags }: any) => {
  const [tags, setTags] = useState<string[]>([]);

  const addTags = (e: any) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTags([...tags, e.target.value]);
      handleTags([...tags, e.target.value]);
      e.target.value = "";
    }
  };

  const removeTag = (index: number) => {
    setTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
    handleTags([...tags.filter((tag) => tags.indexOf(tag) !== index)]);
  };

  return (
    <div className="flex items-start flex-wrap h-auto w-full px-2 mt-2 border-2 rounded-md focus-within:border-blue-700">
      <ul className="flex flex-wrap py-2 mx-2 items-center">
        {tags.map((tag, i) => (
          <li
            key={i}
            className="w-auto h-8 flex items-center justify-center px-2 mx-2 py-2 text-sm list-none rounded-md bg-radix-indigo5 text-radix-indigo11 hover:bg-radix-indigo6 font-bold"
          >
            <span className="items-center">{tag}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => removeTag(i)}
              className="block leading-4 text-center text-sm ml-2 rounded-3xl bg-white cursor-pointer"
            >
              <path
                d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(e) => addTags(e)}
        placeholder="Press enter to add tags"
        className="flex-1 border-none h-11 text-sm pl-1 focus:outline-none"
      />
    </div>
  );
};

export default TagsList;
