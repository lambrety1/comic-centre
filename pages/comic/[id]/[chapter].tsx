import type { GetServerSideProps, NextPage } from "next";

import { ChapterProps } from "../../../shared/types";
import Link from "next/link";
import Navigation from "../../../components/Navigation";
import { getChapterInfo } from "../../../shared/api/chapter";

const Chapter: NextPage<ChapterProps> = ({ chapter, comicId, chapterId }) => {
  return (
    <div className="pt-4">
      <div className="px-[5vw] md:px-[10vw]">
        <p className="text-2xl">
          <Link href={`/comic/${comicId}`}>
            <a className="text-link">{chapter.title}</a>
          </Link>

          <span> - {chapter.chap}</span>
        </p>

        <Navigation chapter={chapter} comicId={comicId} chapterId={chapterId} />
      </div>
      <div className="flex flex-col items-center px-[1vw] min-h-screen">
        {chapter.images.map((image, index) => (
          <img key={image} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>

      <Navigation chapter={chapter} comicId={comicId} chapterId={chapterId} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  try {
    console.log(params?.chapter);
    const chapter = await getChapterInfo(
      params?.id as string,
      params?.chapter as string,
      query?.hashId as string
    );

    return {
      props: {
        chapter,
        comicId: params?.id as string,
        chapterId: params?.chapter as string,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Chapter;
