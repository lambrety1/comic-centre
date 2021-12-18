import { useCallback, useEffect } from "react";

import { ChapterProps } from "../shared/types";
import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Navigation: NextPage<ChapterProps> = ({
  chapter,
  chapterId,
  comicId,
}) => {
  const selectedIndex = chapter.chapters.indexOf(
    chapter.chapters.find((chap) => chap.id === chapterId) as {
      id: string;
      title: string;
      hashId: string;
    }
  );

  const router = useRouter();

  const previousChapter = useCallback(() => {
    router.push({
      pathname: `/comic/${comicId}/${chapter.chapters[selectedIndex + 1]?.id}`,
      query: { hashId: chapter.chapters[selectedIndex + 1]?.hashId },
    });
  }, [chapter, comicId, router, selectedIndex]);

  const nextChapter = useCallback(() => {
    router.push({
      pathname: `/comic/${comicId}/${chapter.chapters[selectedIndex - 1]?.id}`,
      query: { hashId: chapter.chapters[selectedIndex - 1]?.hashId },
    });
  }, [chapter, comicId, router, selectedIndex]);

  const changeChapter = (chapterId: string) => {
    router.push({
      pathname: `/comic/${comicId}/${chapterId}`,
      query: {
        hashId: chapter.chapters.find((chap) => chap.id === chapterId)?.hashId,
      },
    });
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === 37) {
        previousChapter();
      } else if (e.keyCode === 39) {
        nextChapter();
      }
    };
    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, [previousChapter, nextChapter]);

  return (
    <div className="flex justify-center gap-3 my-5">
      <button
        onClick={previousChapter}
        disabled={selectedIndex === chapter.chapters.length - 1}
        className="bg-link hover:bg-link-hover transition duration-300 text-white h-10 w-10 disabled:opacity-50"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <select
        value={chapter.chapters[selectedIndex]?.id}
        onChange={(e) => changeChapter(e.target.value)}
        className="text-black h-10 min-w-[200px] max-w-[350px] outline-none"
      >
        {chapter.chapters.map((chap) => (
          <option value={chap.id} key={chap.id}>
            {chap.title}
          </option>
        ))}
      </select>
      <button
        onClick={nextChapter}
        disabled={selectedIndex < 1}
        className="bg-link hover:bg-link-hover transition duration-300 text-white h-10 w-10 disabled:opacity-50"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Navigation;
