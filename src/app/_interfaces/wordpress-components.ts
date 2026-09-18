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
  expanded_content: string; // HTML del WYSIWYG de WP: roadmap + diferenciales (h4 + ul/li)
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

export interface ProjectFilterWp {
  label: string;
  slug: string;
}

export interface ProjectListItemWp extends ProjectHomeWp {
  slug: string;
}

export interface ProjectsPageWp {
  title: string;
  filters: ProjectFilterWp[];
  projects: ProjectListItemWp[];
}

export interface ProjectMetaItemWp {
  label: string;
  value: string;
}

export interface ProjectImageBlockWp {
  type: "image";
  orientation: "vertical" | "horizontal";
  image: ImageAcf;
  start_col: number;
}

export type ProjectContentBlockWp = ProjectImageBlockWp;

export interface ProjectDetailWp {
  slug: string;
  title: string;
  categories: ProjectCategoryWp[];
  hero_image: ImageAcf;
  meta: ProjectMetaItemWp[];
  headline: string;
  description: string;
  content: ProjectContentBlockWp[];
}

// --- AboutPage ---

export interface AboutTeamPositionWp {
  id: number;
  title: string;
}

export interface AboutTeamWp {
  description: string;
  positions: AboutTeamPositionWp[];
  cta_title: string;
  cta_label: string;
}

export interface AboutDifferentiatorCardWp {
  title: string;
  description: string;
  icon: ImageAcf;
}

export interface AboutDifferentiatorsWp {
  title: string;
  cards: AboutDifferentiatorCardWp[];
}

export interface PartnerWp {
  id: number;
  name: string;
  logo: ImageAcf;
}

export interface AboutPartnersWp {
  description: string;
  partners: PartnerWp[];
}

export interface AboutPageWp {
  title: string;
  description: string;
  gallery: GalleryHomeWp[];
  team_gallery: GalleryHomeWp[];
  team: AboutTeamWp;
  differentiators: AboutDifferentiatorsWp;
  partners: AboutPartnersWp;
}

// --- OutletPage ---

export interface OutletCategoryWp {
  label: string;
  slug: string;
}

export interface OutletProductWp {
  id: number;
  slug: string;
  name: string;
  category: string;
  original_price: string;
  outlet_price: string;
  image: ImageAcf; // thumbnail usado en el listado
  // --- Campos solo usados en el detalle ---
  color_name?: string;
  description?: string;
  note?: string;
  gallery?: ImageAcf[]; // fotos del producto, controla los dots
}

export interface OutletPageWp {
  label: string;
  title: string;
  description: string;
  categories: OutletCategoryWp[];
  products: OutletProductWp[];
}
