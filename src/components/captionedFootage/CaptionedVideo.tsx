import { forwardRef } from "react";
import CaptionedFloatFootage from "./CaptionedFloatFootage";

interface CaptionedVideoProps {
  src: string;
  maxHeight?: number | string;
  caption?: string;
  autoPlay?: boolean;
  float?: 'left' | 'right';
};

const CaptionedVideo = forwardRef<HTMLVideoElement, CaptionedVideoProps>((
  { src, maxHeight, caption, autoPlay, float },
  ref
) => {
  return (
    <CaptionedFloatFootage caption={caption} float={float}>
      <video
        ref={ref}
        src={src}
        style={{ maxHeight, maxWidth: '100%' }}
        autoPlay={autoPlay}
        playsInline
        controls
        muted
        loop
      />
    </CaptionedFloatFootage>
  )
});

export default CaptionedVideo;