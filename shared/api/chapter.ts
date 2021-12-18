import axios from "../axios";
import { parse } from "node-html-parser";

export const getChapterInfo = async (
  comicId: string,
  chapterId: string,
  hashId?: string
): Promise<any> => {
  const links = [
    `truyen-tranh/${comicId}/${chapterId}/${hashId || 0}`,
    `truyen-tranh/${comicId}`,
  ];

  const sources = await Promise.all(
    links.map(async (link) => (await axios.get(link)).data)
  );

  const dom = parse(sources[0]);

  const dom2 = parse(sources[1]);

  if (!dom.querySelector(".txt-primary a")?.innerText) {
    throw new Error("Wrong Hash");
  }

  return {
    title: dom.querySelector(".txt-primary a")?.innerText,
    comic: dom
      .querySelector(".txt-primary a")
      ?.getAttribute("href")
      ?.split("/")
      .slice(-1)[0]
      .split("-")
      .slice(0, -1)
      .join("-"),
    chap: dom
      .querySelector(".txt-primary span")
      ?.innerText.replace("-", "")
      .trim(),
    images: dom
      .querySelectorAll(".box_doc img")
      .map(
        (img) =>
          `/api/image?url=${encodeURIComponent(
            img.getAttribute("src") as string
          )}`
      ),
    chapters: dom2
      .querySelectorAll(".list-chapter ul li:not(.heading)")
      .map((li) => ({
        title: li.querySelector(".chapter a")?.innerText,
        id: li
          .querySelector(".chapter a")
          ?.getAttribute("href")
          ?.split("/")
          .slice(-2)[0],
        hashId: li
          .querySelector(".chapter a")
          ?.getAttribute("href")
          ?.split("/")
          .slice(-1)[0],
      })),
  };
};
