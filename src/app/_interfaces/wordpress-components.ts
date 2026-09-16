import { ImageAcf } from "./wordpress-page";

export interface HomePageWp {
  hero_page: MediaFileWp[];
  intro_description: DescriptionWp;
  our_services: ServiceWp[];
  gallery: GalleryHomeWp[];
  where_we_make_difference: WhereWeMakeDifferenceWp;
  projects: ProjectHomeWp[];
  visit_us_description: DescriptionWp;
}

export interface MediaFileWp {
  url: string;
  type: "video" | "image";
}

export interface ServiceWp {
  label: string;
  title: string;
  description: string;
  image: ImageAcf;
}

export interface GalleryHomeWp {
  image: ImageAcf;
  aspect: "landscape" | "portrait" | "square";
}

export interface DifferenceCardWp {
  number: string;
  title: string;
  description: string;
  icon: ImageAcf;
}

export interface WhereWeMakeDifferenceWp {
  title: string;
  cards: DifferenceCardWp[];
}

export interface ProjectHomeWp {
  project: string;
  title: string;
  feature_image: ImageAcf;
  categories: ProjectCategoryWp[];
}

export interface ProjectCategoryWp {
  id: number;
  name: string;
  slug: string;
}

export interface DescriptionWp {
  description: string;
}

export interface ShowroomLocationWp {
  label: string;
  contact: string;
  description: string;
}

export interface ShowroomPageWp {
  title: string;
  locations: ShowroomLocationWp[];
  gallery: ImageAcf[];
}

export interface ContactOfficeWp {
  label: string;
  address: string;
  phone: string;
  email: string;
}

export interface ContactPageWp {
  background_image: ImageAcf;
  offices: ContactOfficeWp[];
}

export interface NewsItemWp {
  id: number;
  title: string;
  slug: string;
}

export interface NewsPageWp {
  title: string;
  news: NewsItemWp[];
}

export interface MediaImageWp {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface NewsContentBlockWp {
  type: "paragraph" | "image" | "quote" | "video";
  text?: string;
  image?: MediaImageWp;
  video?: {
    url: string;
    poster?: MediaImageWp;
  };
}

export interface NewsDetailWp {
  id: number;
  slug: string;
  category: string;
  number: string;
  title: string;
  hero_image: MediaImageWp;
  content: NewsContentBlockWp[];
}
