import { FormEvent, useState } from "react";

import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Navbar: NextPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim())
      router.push({
        pathname: "/search",
        query: {
          q: inputValue.trim(),
        },
      });
  };

  return (
    <div
      className={`${
        isActive ? "h-28" : "h-14"
      } md:!h-14 bg-nav flex flex-col md:flex-row justify-around md:justify-between items-stretch md:items-center px-[5vw]`}
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center justify-start gap-3">
            <img src="/icon.png" className="w-6 h-6" alt="icon" />
            <h1 className="text-2xl font-bold">
              <span className="text-link">Comic</span>Centre
            </h1>
          </a>
        </Link>
        <button className="md:hidden block">
          <i
            onClick={() => setIsActive((prev) => !prev)}
            className={`fas ${
              isActive ? "fa-times" : "fa-search"
            } text-white text-2xl`}
          ></i>
        </button>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className={`${isActive ? "flex" : "hidden"} md:!flex`}
      >
        <input
          type="text"
          className="h-8 px-3 flex-grow text-black outline-none"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="flex-shrink-0 flex justify-center items-center h-8 w-8 bg-[#DEDFE0]">
          <i className="fas fa-search text-black text-lg"></i>
        </button>
      </form>
    </div>
  );
};

export default Navbar;
