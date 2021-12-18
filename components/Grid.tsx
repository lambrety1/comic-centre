import { GridProps } from "../shared/types";
import Link from "next/link";
import type { NextPage } from "next";

const Grid: NextPage<GridProps> = ({ items }) => {
  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gridAutoRows: "1fr",
      }}
    >
      {items.map((child) => (
        <Link href={`/comic/${child.id}`} key={child.id}>
          <a className="flex flex-col items-stretch">
            <div className="w-full h-0 pb-[150%] relative flex-grow">
              <img
                src={child.cover}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt={child.title}
              />
            </div>
            <h1 className="max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-center flex-shrink-0">
              {child.title}
            </h1>
            <p className="max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-center flex-shrink-0">
              {child.chapter}
            </p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Grid;
