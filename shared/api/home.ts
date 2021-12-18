import axios from "../axios";
import { parse } from "node-html-parser";

export const getHome = async (): Promise<any> => {
  const sections = {
    "Truyện được xem nhiều nhất": "tim-truyen?status=-1&sort=15",
    "Truyện mới cập nhật": "tim-truyen?status=-1&sort=10",
  };
  const sources = await Promise.all(
    Object.entries(sections)
      .map(([_, value]) => value)
      .map(async (url) => (await axios.get(url)).data)
  );

  const data = sources.map((source, index) => {
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

    return {
      name: Object.keys(sections)[index],
      items,
    };
  });

  return data;
};
