import type { ImageProps } from "./captionedFootage.interfaces";
import CaptionedFloatFootage from "./CaptionedFloatFootage";

interface FloatImageProps extends ImageProps {
  float?: 'left' | 'right';
  maxHeight?: number;
}

const FloatImage = ({
  src,
  alt,
  caption,
  float,
  maxHeight = 200
}: FloatImageProps) => {
  return (
    <CaptionedFloatFootage
      alt={alt}
      caption={caption}
      float={float}
    >
      <img
        src={src}
        alt={alt}
        style={{
          maxHeight,
          maxWidth: '100%',
          objectFit: 'contain',
        }}
        draggable={false}
        loading="lazy"
      />
    </CaptionedFloatFootage>
  );
};

export default FloatImage;
