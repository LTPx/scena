import { Content, GUID } from "./wordpress";
import { AcfComponents } from "./wordpress-page";

export interface WordPressProject {
  id: number;
  date: Date;
  slug: string;
  status: string;
  link: string;
  title: GUID;
  content: Content;
  author: number;
  acf: AcfComponents;
  _embedded: {
    "wp:term": {
      categories: {
        id: number;
        name: string;
        slug: string;
      }[];
    };
    tags: number[]
  };
}
