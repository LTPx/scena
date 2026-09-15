export interface WordPressPost {
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
  title: GUID;
  content: Content;
  excerpt: Content;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Meta;
  categories: number[];
  tags: number[];
  acf: any[];
  yoast_head: string;
  yoast_head_json: TopLevelYoastHeadJSON;
  _links: TopLevelLinks;
  _embedded: Embedded;
  featured_media_src_url: string;
}

export interface Embedded {
  author: EmbeddedAuthor[];
  'wp:featuredmedia': WpFeaturedmedia[];
  'wp:term': Array<EmbeddedWpTerm[]>;
}

export interface EmbeddedAuthor {
  code: string;
  message: string;
  data: Data;
}

export interface Data {
  status: number;
}

export interface WpFeaturedmedia {
  id: number;
  date: Date;
  slug: string;
  type: string;
  link: string;
  title: GUID;
  author: number;
  yoast_head: string;
  yoast_head_json: WpFeaturedmediaYoastHeadJSON;
  acf: any[];
  caption: GUID;
  alt_text: string;
  media_type: string;
  mime_type: Type;
  media_details: MediaDetails;
  source_url: string;
  _links: WpFeaturedmediaLinks;
}

export interface WpFeaturedmediaLinks {
  self: About[];
  collection: About[];
  about: About[];
  author: ReplyElement[];
  replies: ReplyElement[];
}

export interface About {
  href: string;
}

export interface ReplyElement {
  embeddable: boolean;
  href: string;
}

export interface GUID {
  rendered: string;
}

export interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: Sizes;
  image_meta: ImageMeta;
  original_image?: string;
}

export interface ImageMeta {
  aperture: string;
  credit: string;
  camera: string;
  caption: string;
  created_timestamp: string;
  copyright: string;
  focal_length: string;
  iso: string;
  shutter_speed: string;
  title: string;
  orientation: string;
  keywords: any[];
}

export interface Sizes {
  medium: The1536_X1536;
  large: The1536_X1536;
  thumbnail: The1536_X1536;
  medium_large: The1536_X1536;
  '1536x1536': The1536_X1536;
  '2048x2048'?: The1536_X1536;
  full: The1536_X1536;
}

export interface The1536_X1536 {
  file: string;
  width: number;
  height: number;
  mime_type: Type;
  source_url: string;
}

export enum Type {
  ImageJPEG = 'image/jpeg',
}

export interface WpFeaturedmediaYoastHeadJSON {
  title: string;
  robots: PurpleRobots;
  og_locale: OgLocale;
  og_type: OgType;
  og_title: string;
  og_description?: string;
  og_site_name: OgSiteName;
  article_publisher: string;
  article_modified_time?: Date;
  og_image: OgImage[];
  twitter_card: TwitterCard;
  twitter_site: Twitter;
  schema: PurpleSchema;
}

export interface OgImage {
  width: number;
  height: number;
  url: string;
  type: Type;
}

export enum OgLocale {
  EnGB = 'en_GB',
}

export enum OgSiteName {
  CharlesMarlow = 'Charles Marlow',
}

export enum OgType {
  Article = 'article',
}

export interface PurpleRobots {
  index: Index;
  follow: Follow;
}

export enum Follow {
  Follow = 'follow',
}

export enum Index {
  Index = 'index',
  Noindex = 'noindex',
}

export interface PurpleSchema {
  '@context': string;
  '@graph': PurpleGraph[];
}

export interface PurpleGraph {
  '@type': PurpleType;
  '@id': string;
  url?: string;
  name?: string;
  isPartOf?: BreadcrumbClass;
  datePublished?: Date;
  dateModified?: Date;
  breadcrumb?: BreadcrumbClass;
  inLanguage?: InLanguage;
  potentialAction?: PurplePotentialAction[];
  itemListElement?: ItemListElement[];
  description?: string;
  author?: BreadcrumbClass;
  image?: Image;
  sameAs?: string[];
}

export enum PurpleType {
  BreadcrumbList = 'BreadcrumbList',
  Person = 'Person',
  WebPage = 'WebPage',
  WebSite = 'WebSite',
}

export interface BreadcrumbClass {
  '@id': string;
}

export interface Image {
  '@type': string;
  inLanguage: InLanguage;
  '@id': string;
  url: string;
  contentUrl: string;
  caption: string;
}

export enum InLanguage {
  EnGB = 'en-GB',
}

export interface ItemListElement {
  '@type': ItemListElementType;
  position: number;
  name: string;
  item?: string;
}

export enum ItemListElementType {
  ListItem = 'ListItem',
}

export interface PurplePotentialAction {
  '@type': PotentialActionType;
  target: string[] | TargetClass;
  'query-input'?: QueryInput;
}

export enum PotentialActionType {
  ReadAction = 'ReadAction',
  SearchAction = 'SearchAction',
}

export enum QueryInput {
  RequiredNameSearchTermString = 'required name=search_term_string',
}

export interface TargetClass {
  '@type': TargetType;
  urlTemplate: string;
}

export enum TargetType {
  EntryPoint = 'EntryPoint',
}

export enum TwitterCard {
  SummaryLargeImage = 'summary_large_image',
}

export enum Twitter {
  CharlesMarlow = '@_CharlesMarlow',
}

export interface EmbeddedWpTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: Taxonomy;
  yoast_head: string;
  yoast_head_json: WpTermYoastHeadJSON;
  acf?: any[];
  _links: WpTermLinks;
}

export interface WpTermLinks {
  self: About[];
  collection: About[];
  about: About[];
  'wp:post_type': About[];
  curies: Cury[];
}

export interface Cury {
  name: Name;
  href: Href;
  templated: boolean;
}

export enum Href {
  HTTPSAPIWOrgRel = 'https://api.w.org/{rel}',
}

export enum Name {
  Wp = 'wp',
}

export enum Taxonomy {
  Category = 'category',
  PostTag = 'post_tag',
}

export interface WpTermYoastHeadJSON {
  title: string;
  robots: FluffyRobots;
  og_locale: OgLocale;
  og_type: OgType;
  og_title: string;
  og_site_name: OgSiteName;
  og_image: OgImage[];
  twitter_card: TwitterCard;
  twitter_site: Twitter;
  schema: FluffySchema;
}

export interface FluffyRobots {
  index: Index;
  follow: Follow;
  'max-snippet'?: MaxSnippet;
  'max-image-preview'?: MaxImagePreview;
  'max-video-preview'?: MaxVideoPreview;
}

export enum MaxImagePreview {
  MaxImagePreviewLarge = 'max-image-preview:large',
}

export enum MaxSnippet {
  MaxSnippet1 = 'max-snippet:-1',
}

export enum MaxVideoPreview {
  MaxVideoPreview1 = 'max-video-preview:-1',
}

export interface FluffySchema {
  '@context': string;
  '@graph': FluffyGraph[];
}

export interface FluffyGraph {
  '@type': FluffyType;
  '@id': string;
  url?: string;
  name?: string;
  isPartOf?: BreadcrumbClass;
  breadcrumb?: BreadcrumbClass;
  inLanguage?: InLanguage;
  itemListElement?: ItemListElement[];
  description?: string;
  potentialAction?: FluffyPotentialAction[];
}

export enum FluffyType {
  BreadcrumbList = 'BreadcrumbList',
  CollectionPage = 'CollectionPage',
  WebSite = 'WebSite',
}

export interface FluffyPotentialAction {
  '@type': PotentialActionType;
  target: TargetClass;
  'query-input': QueryInput;
}

export interface TopLevelLinks {
  self: About[];
  collection: About[];
  about: About[];
  author: ReplyElement[];
  replies: ReplyElement[];
  'version-history': VersionHistory[];
  'predecessor-version': PredecessorVersion[];
  'wp:featuredmedia': ReplyElement[];
  'wp:attachment': About[];
  'wp:term': LinksWpTerm[];
  curies: Cury[];
}

export interface PredecessorVersion {
  id: number;
  href: string;
}

export interface VersionHistory {
  count: number;
  href: string;
}

export interface LinksWpTerm {
  taxonomy: Taxonomy;
  embeddable: boolean;
  href: string;
}

export interface Content {
  rendered: string;
  protected: boolean;
}

export interface Meta {
  'content-type': string;
  footnotes: string;
}

export interface TopLevelYoastHeadJSON {
  title: string;
  description: string;
  robots: FluffyRobots;
  og_locale: OgLocale;
  og_type: OgType;
  og_title: string;
  og_description: string;
  og_site_name: OgSiteName;
  article_publisher: string;
  article_published_time: Date;
  article_modified_time: Date;
  og_image: OgImage[];
  author: string;
  twitter_card: TwitterCard;
  twitter_creator: Twitter;
  twitter_site: Twitter;
  twitter_misc: TwitterMisc;
  schema: PurpleSchema;
}

export interface TwitterMisc {
  'Written by': string;
  'Estimated reading time': string;
}

export interface FavoritePost {
  userId: number;
  postId: number;
  slug: string;
  title: string;
  imageUrl: string;
  updatedAt: Date;
  createdAt: Date;
}
