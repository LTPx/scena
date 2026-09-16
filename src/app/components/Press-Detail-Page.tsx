import Image from "next/image";
import {
  NewsContentBlockWp,
  NewsDetailWp,
} from "@/app/_interfaces/wordpress-components";

interface Props {
  data: NewsDetailWp;
}

// Columnas que usa el texto/imagen "de contenido" (angosto, alineado al título)
const CONTENT_COLS = "md:col-start-6 md:col-span-5";
// Columnas que usa el media "full-bleed" (hero, video)
const MEDIA_COLS = "md:col-start-3 md:col-span-10";

function ContentBlock({ block }: { block: NewsContentBlockWp }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[15px] leading-relaxed text-neutral-600">
          {block.text}
        </p>
      );

    case "image":
      if (!block.image) return null;
      return (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={block.image.url}
            alt={block.image.alt}
            fill
            className="object-cover"
          />
        </div>
      );

    case "quote":
      return (
        <p className="whitespace-pre-line text-[clamp(20px,2.2vw,28px)] leading-snug text-[color:var(--color-press-title,#8a6a4e)]">
          {block.text}
        </p>
      );

    case "video":
      if (!block.video) return null;
      return (
        <video className="w-full" controls poster={block.video.poster?.url}>
          <source src={block.video.url} type="video/mp4" />
        </video>
      );

    default:
      return null;
  }
}

export default function PressDetailPage({ data }: Props) {
  return (
    <article className="px-6 py-10 md:px-10 md:py-[clamp(24px,6vh,60px)]">
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-12 md:gap-x-6 md:gap-y-16">
        {/* Fila 1: Noticias / 01 / Título — cols 3, 5, 6 */}
        <span className="font-sans text-base text-neutral-500 md:col-start-3 md:col-span-2">
          {data.category}
        </span>

        <span className="text-xs text-neutral-400 md:col-start-5 md:col-span-1 md:self-start">
          {data.number}
        </span>

        <h1 className="font-sans text-[clamp(20px,2.4vw,32px)] leading-snug text-[color:var(--color-press-title,#8a6a4e)] md:col-start-6 md:col-span-5">
          {data.title}
        </h1>

        {/* Fila 2: imagen hero — full-bleed, col 3 a 12 */}
        <div className={`relative aspect-[16/9] w-full overflow-hidden ${MEDIA_COLS}`}>
          <Image
            src={data.hero_image.url}
            alt={data.hero_image.alt}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Bloques de contenido desde WP */}
        {data.content.map((block, index) => (
          <div
            key={index}
            className={block.type === "video" ? MEDIA_COLS : CONTENT_COLS}
          >
            <ContentBlock block={block} />
          </div>
        ))}
      </div>
    </article>
  );
}