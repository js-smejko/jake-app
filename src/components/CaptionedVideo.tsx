import { forwardRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { play, pause } from "ionicons/icons";
import styles from "./CaptionedVideo.module.css";

interface CaptionedVideoProps {
  src: string;
  maxHeight?: number | string;
  caption?: string;
  controls?: boolean;
};

const CaptionedVideo = forwardRef<HTMLVideoElement, CaptionedVideoProps>((
  { src, maxHeight, caption, controls },
  ref
) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOverlay = () => {
    setShowOverlay(true);
    setIsPlaying(prev => !prev);

    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  return (
    <figure>
      <div className={styles.wrapper}>
        <video
          ref={ref}
          src={src}
          style={{ maxHeight, maxWidth: '100%' }}
          playsInline
          autoPlay
          controls={controls}
          muted
          loop
          onPlay={handleOverlay}
          onPause={handleOverlay}
        />
        {!controls && showOverlay && (
          <div className={`${styles.overlay} ${showOverlay ? styles.visible : ""}`}>
            <div className={styles.icon}>
              <IonIcon icon={isPlaying ? pause : play} />
            </div>
          </div>
        )}
      </div>
      <figcaption>
        <i className="caption">{caption}</i>
      </figcaption>
    </figure>
  )
});

export default CaptionedVideo;