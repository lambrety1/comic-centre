import type { GetStaticProps, NextPage } from "next";

import Grid from "../components/Grid";
import { HomeProps } from "../shared/types";
import { getHome } from "../shared/api/home";

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.name} className="px-[5vw] mb-7">
          <h1 className="text-2xl font-semibold my-5">{item.name}</h1>
          <Grid items={item.items} />
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
