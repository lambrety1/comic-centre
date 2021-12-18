import type { GetStaticProps, NextPage } from "next";

import { HomeProps } from "../shared/types";
import Image from "next/image";
import Link from "next/link";
import { getHome } from "../shared/api/home";

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.name} className="px-[5vw] mb-7">
          <h1 className="text-2xl font-semibold my-5">{item.name}</h1>
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            }}
          >
            {item.items.map((child) => (
              <Link href={`/comic/${child.id}`} key={child.id}>
                <a className="flex flex-col items-stretch">
                  <Image
                    src={child.cover}
                    height={300}
                    width={200}
                    layout="responsive"
                    objectFit="cover"
                    quality={100}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAEsAQMAAAC8NG79AAAABlBMVEXMzMwAAADTMzNkAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAHklEQVRYhe3BMQEAAADCoPVPbQdvoAAAAAAAAADgNx54AAHw+DPXAAAAAElFTkSuQmCC"
                    alt={child.title}
                  />
                  <h1 className="max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-center">
                    {child.title}
                  </h1>
                  <p className="max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-center">
                    {child.chapter}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHome();
    return {
      props: {
        data,
      },
      revalidate: 120,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home;
