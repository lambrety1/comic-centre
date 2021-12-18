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

export interface ComicProps {
  id: string;
  info: {
    title: string;
    cover: string;
    author: string;
    status: string;
    categories: string[];
    description: string;
    chapters: {
      title: string;
      id: string;
      updatedAt: string;
      hashId: string;
    }[];
  };
}

export interface ChapterProps {
  comicId: string;
  chapterId: string;
  chapter: {
    title: string;
    comic: string;
    chap: string;
    images: string[];
    chapters: {
      title: string;
      id: string;
      hashId: string;
    }[];
  };
}
