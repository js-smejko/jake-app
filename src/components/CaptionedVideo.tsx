import { forwardRef } from "react";
import styles from "./CaptionedVideo.module.css";

interface CaptionedVideoProps {
  src: string;
  maxHeight?: number | string;
  caption?: string;
};

const CaptionedVideo = forwardRef<HTMLVideoElement, CaptionedVideoProps>((
  { src, maxHeight, caption },
  ref
) => {
  return (
    <figure>
      <div className={styles.wrapper}>
        <video
          ref={ref}
          src={src}
          style={{ maxHeight, maxWidth: '100%' }}
          playsInline
          autoPlay
          controls
          muted
          loop
        />
      </div>
      <figcaption>
        <i className="caption">{caption}</i>
      </figcaption>
    </figure>
  )
});

export default CaptionedVideo;