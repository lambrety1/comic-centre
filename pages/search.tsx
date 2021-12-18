import type { GetServerSideProps, NextPage } from "next";

import Grid from "../components/Grid";
import { SearchProps } from "../shared/types";
import { search } from "../shared/api/search";

const Search: NextPage<SearchProps> = ({ keyword, items }) => {
  return (
    <div className="px-[5vw]">
      <h1 className="my-4 text-2xl">Search result for: {keyword}</h1>
      {items.length === 0 ? <h1>No result found</h1> : <Grid items={items} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    if (!(query?.q as string)?.trim()) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
    const list = await search(query?.q as string);

    return {
      props: {
        keyword: query?.q as string,
        items: list,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Search;
