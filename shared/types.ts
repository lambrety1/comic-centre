export interface HomeProps {
  data: {
    name: string;
    items: {
      title: string;
      cover: string;
      chapter: string;
      id: string;
    }[];
  }[];
}
