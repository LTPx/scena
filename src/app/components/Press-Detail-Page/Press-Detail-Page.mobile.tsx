import Image from "next/image";
import {
  NewsContentBlockWp,
  NewsDetailWp,
} from "@/app/_interfaces/wordpress-components";

interface Props {
  data: NewsDetailWp;
}

const TEXT_COLOR = "text-[#A89572]";

function ContentBlock({ block }: { block: NewsContentBlockWp }) {
  switch (block.type) {
    case "paragraph":
      return (
        <div
          className={`font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] ${TEXT_COLOR} [&_a]:underline [&_a]:decoration-solid [&_a]:underline-offset-auto [&_p+p]:mt-[16px]`}
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case "image":
      return (
        <div
          data-header-theme="dark"
          className="relative h-[539px] w-full overflow-hidden"
        >
          <Image
            src={block.image.url}
            alt={block.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      );

    case "quote":
      return (
        <p
          className={`whitespace-pre-line font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] ${TEXT_COLOR}`}
        >
          {block.text}
        </p>
      );
  }
}

export default function PressDetailPageMobile({ data }: Props) {
  return (
    <article
      data-header-theme="light"
      className="flex w-full flex-col px-[16px] pb-[60px] pt-[200px]"
    >
      <span
        className={`font-[Gellix] text-[16px] font-normal not-italic leading-[135%] tracking-[0%] ${TEXT_COLOR}`}
      >
        {data.number}
      </span>

      <h1
        className={`mt-[40px] font-[Gellix] text-[30px] font-normal not-italic leading-[100%] tracking-[0%] ${TEXT_COLOR}`}
      >
        {data.title}
      </h1>

      <div
        data-header-theme="dark"
        className="relative mt-[40px] h-[540px] w-full overflow-hidden"
      >
        <Image
          src={data.hero_image.url}
          alt={data.hero_image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-[40px] flex flex-col gap-[40px]">
        {data.content.map((block, index) => (
          <ContentBlock key={index} block={block} />
        ))}
      </div>

      {data.video && (
        <div data-header-theme="dark" className="mt-[40px] w-full">
          <video
            className="h-[200px] w-full object-cover"
            controls
            poster={data.video.poster?.url}
          >
            <source src={data.video.url} type="video/mp4" />
          </video>
        </div>
      )}
    </article>
  );
}
