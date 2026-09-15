'use client';

import { MediaFileWp } from "../_interfaces/wordpress-components";

interface Props {
  children?: React.ReactElement;
  className?: string;
  media?: MediaFileWp;
  img?: string;
}

export function Cover(props: Props) {
  const {
    children,
    className,
    media,
    img
  } = props;

  return (
    <div className={`cover-video-container`}>
      {img && (
        <img
        src={img}
        className={`${className} w-full h-[550px] lg:h-[95vh] object-cover`}
      />
      )}
      {media?.type === 'video' && (
        <video
          className={`${className} w-full h-[550px] lg:h-[95vh] object-cover`}
          autoPlay={true}
          loop={true}
          muted
          playsInline
          preload="auto"
        >
          <source src={media.url} type="video/mp4" />
        </video>
      )}
      {media?.type === 'image' && (
        <img
          src={media.url}
          className={`${className} w-full h-[550px] lg:h-[95vh] object-cover`}
        />
      )}
      <div
        className={`absolute lg:h-full inset-0 md:h-[550px] ${className}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.25))',
          zIndex: 1,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
}

export default Cover;
