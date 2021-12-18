import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useState } from "react";

const Navbar: NextPage = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`${
        isActive ? "h-28" : "h-14"
      } md:!h-14 bg-nav flex flex-col md:flex-row justify-around md:justify-between items-stretch md:items-center px-[5vw]`}
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center justify-start gap-3">
            <Image priority src="/icon.png" height={24} width={24} alt="Icon" />
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
      <form className={`${isActive ? "flex" : "hidden"} md:!flex`}>
        <input
          type="text"
          className="h-8 px-3 flex-grow text-black outline-none"
          placeholder="Search..."
        />
        <button className="flex-shrink-0 flex justify-center items-center h-8 w-8 bg-[#DEDFE0]">
          <i className="fas fa-search text-black text-lg"></i>
        </button>
      </form>
    </div>
  );
};

export default Navbar;
