import axios from "../axios";
import { parse } from "node-html-parser";

export const search = async (keyword: string): Promise<any> => {
  const source = (await axios.get("tim-truyen", { params: { keyword } })).data;

  const dom = parse(source);

  const items = dom.querySelectorAll(".item").map((item) => ({
    title: item.querySelector(".jtip")?.innerText,
    cover: item
      .querySelector("img")
      ?.getAttribute("data-original")
      ?.replace("//", "http://"),
    chapter: item.querySelector(".chapter a")?.innerText,
    id: item
      .querySelector("a")
      ?.getAttribute("href")
      ?.split("/")
      .slice(-1)[0]
      .split("-")
      .slice(0, -1)
      .join("-"),
  }));

  return items;
};
