import {
  About,
  Content,
  Cury,
  GUID,
  ItemListElement,
  OgImage,
  TargetClass,
} from "./wordpress";
import { HomePageWp } from "./wordpress-components";

export interface WordPressFrontendPage {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: GUID;
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: string;
  content: Content;
  featured_media: number;
  template: string;
  parent: number;
  aioseo_seo: YoastHeadJSON;
  yoast_head: string;
  yoast_head_json: YoastHeadJSON;
  _links: Links;
  acf: AcfComponents;
  _embedded: {
    "wp:term": {
      categories: {
        id: number;
        name: string;
        slug: string;
        title: {
          rendered: string;
        };
      }[];
    };
    tags: number[];
  };
}

export interface YoastHeadJSON {
  seo_title: string;
  seo_desc: string;
  seo_keywords: string[];
  seo_canonical: string;
}

export interface Links {
  self: About[];
  collection: About[];
  about: About[];
  "wp:attachment": About[];
  curies: Cury[];
}

export interface Cover {
  image: ImageAcf;
  text: string;
  buttons: ButtonWp[];
}

export interface ButtonWp {
  text: string;
  url: string;
  openNewTab: boolean;
}

export interface ImageAcf {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: Date;
  modified: Date;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: SizesAcf;
}

export interface SizesAcf {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
  "1536x1536": string;
  "1536x1536-width": number;
  "1536x1536-height": number;
  "2048x2048": string;
  "2048x2048-width": number;
  "2048x2048-height": number;
}

export interface YoastHeadJSON {
  title: string;
  description: string;
  robots: Robots;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_site_name: string;
  article_publisher: string;
  article_modified_time: Date;
  og_image: OgImage[];
  twitter_card: string;
  twitter_site: string;
  schema: Schema;
}

export interface Robots {
  index: string;
  follow: string;
  "max-snippet": string;
  "max-image-preview": string;
  "max-video-preview": string;
}

export interface Schema {
  "@context": string;
  "@graph": Graph[];
}

export interface Graph {
  "@type": string;
  "@id": string;
  url?: string;
  name?: string;
  isPartOf?: Breadcrumb;
  datePublished?: Date;
  dateModified?: Date;
  breadcrumb?: Breadcrumb;
  inLanguage?: string;
  potentialAction?: PotentialAction[];
  itemListElement?: ItemListElement[];
  description?: string;
}

export interface Breadcrumb {
  "@id": string;
}

export interface PotentialAction {
  "@type": string;
  target: string[] | TargetClass;
  "query-input"?: string;
}

export interface AcfComponents {
  home_information: HomePageWp;
}

export interface Project {
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  filter: string;
}
