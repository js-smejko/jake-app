interface CaptionedVideoProps {
  src: string;
  maxHeight?: number | string;
  caption?: string;
  controls?: boolean;
};

const CaptionedVideo = ({ src, maxHeight, caption, controls }: CaptionedVideoProps) => {
  return (
    <figure>
      <video
        src={src}
        style={{ maxHeight, maxWidth: '100%' }}
        playsInline
        autoPlay
        controls={controls}
        muted
        loop
      />
      <figcaption>
        <i className="caption">{caption}</i>
      </figcaption>
    </figure>
  )
};

export default CaptionedVideo;