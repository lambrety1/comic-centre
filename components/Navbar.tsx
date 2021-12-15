import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

const Navbar: NextPage = () => {
  return (
    <div className="h-14 bg-nav w-screen flex justify-between items-center px-[5vw]">
      <Link href="/">
        <a className="flex items-center gap-3">
          <Image priority src="/icon.png" height={24} width={24} alt="Icon" />
          <h1 className="text-2xl font-bold">
            <span className="text-link">Comic</span>Centre
          </h1>
        </a>
      </Link>
      <form>
        <input type="text" className="h-7 px-3" placeholder="Search..." />
      </form>
    </div>
  );
};

export default Navbar;
