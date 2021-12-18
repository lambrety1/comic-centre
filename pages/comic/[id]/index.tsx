import type { GetServerSideProps, NextPage } from "next";

import type { ComicProps } from "../../../shared/types";
import Link from "next/link";
import { getComicInfo } from "../../../shared/api/comic";

const Comic: NextPage<ComicProps> = ({ info, id }) => {
  return (
    <div className="xl:px-[10vw] px-[5vw] py-10 flex flex-col items-stretch gap-6 md:gap-10">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        <div className="flex-shrink-0">
          <img
            className="h-[300px] w-[200px] object-cover"
            src={info.cover}
            alt=""
          />
        </div>
        <div className="flex-grow flex flex-col items-start gap-2">
          <h1 className="text-3xl">{info.title}</h1>
          {info.author && <p>Tác giả: {info.author}</p>}
          {info.status && <p>Trạng thái: {info.status}</p>}
          {info.categories && info.categories.length > 0 && (
            <p>Danh mục: {info.categories.join(", ")}</p>
          )}

          <div className="flex gap-3 mt-3">
            <Link
              href={{
                pathname: `/comic/${id}/${info.chapters.slice(-1)[0].id}`,
                query: { hashId: info.chapters.slice(-1)[0].hashId },
              }}
            >
              <a className="bg-link hover:bg-link-hover transition duration-300 text-white rounded py-2 px-3">
                Đọc từ đầu
              </a>
            </Link>
            <Link
              href={{
                pathname: `/comic/${id}/${info.chapters[0].id}`,
                query: { hashId: info.chapters[0].hashId },
              }}
            >
              <a className="bg-link hover:bg-link-hover transition duration-300 text-white rounded py-2 px-3">
                Đọc mới nhất
              </a>
            </Link>
          </div>
        </div>
      </div>

      {info.description && (
        <p className="max-w-full break-words text-justify">
          {info.description}
        </p>
      )}

      <div className="border border-gray-700 max-h-[320px] overflow-auto">
        {info.chapters.map((chapter) => (
          <Link
            href={{
              pathname: `/comic/${id}/${chapter.id}`,
              query: { hashId: chapter.hashId },
            }}
            key={chapter.id}
          >
            <a className="flex justify-between px-3 py-1 border-b border-gray-700 hover:text-link transition duration-300 visited:text-link visited:hover:text-link-hover">
              <p>{chapter.title}</p>
              <p>{chapter.updatedAt}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const data = await getComicInfo(params?.id as string);

    return {
      props: {
        id: params?.id,
        info: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Comic;
