"use client";

import { MediaFileWp } from "../_interfaces/wordpress-components";

interface Props {
  children?: React.ReactElement;
  className?: string;
  media?: MediaFileWp;
  img?: string;
}

export function Cover(props: Props) {
  const { children, className = "", media, img } = props;

  const mediaClassName = `${className} h-[550px] w-full object-cover lg:h-[100dvh]`;

  return (
    <div className="cover-video-container relative">
      {img && <img src={img} alt="" className={mediaClassName} />}

      {media?.type === "video" && (
        <video
          className={mediaClassName}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={media.url} type="video/mp4" />
        </video>
      )}

      {media?.type === "image" && (
        <img src={media.url} alt="" className={mediaClassName} />
      )}

      <div
        className="absolute inset-0 z-[1] h-[550px] lg:h-full"
        style={{
          background:
            "linear-gradient(360deg, rgba(255, 255, 255, 0) 71.7%, rgba(0, 0, 0, 0.4) 96.97%)",
        }}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default Cover;
