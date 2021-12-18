import axios from "../axios";
import { parse } from "node-html-parser";

export const getComicInfo = async (comicId: string): Promise<any> => {
  const source = (await axios.get(`truyen-tranh/${comicId}`)).data;
  const dom = parse(source);

  return {
    title: dom.querySelector("#item-detail .title-detail")?.innerText,
    cover: dom
      .querySelector("#item-detail .detail-info img")
      ?.getAttribute("src")
      ?.replace("//", "https://"),
    author: dom.querySelector("#item-detail .author.row .col-xs-8")?.innerText,
    status: dom.querySelector("#item-detail .status.row .col-xs-8")?.innerText,
    categories: dom
      .querySelectorAll("#item-detail .kind .col-xs-8 a")
      .map((anchor) => anchor.innerText),
    description: dom.querySelector(".detail-content p")?.innerText,
    chapters: dom
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
        updatedAt: li.querySelector(".col-xs-4")?.innerText,
      })),
  };
};
