interface CaptionedVideoProps {
  src: string;
  maxHeight?: number | string;
  caption?: string;
  controls?: boolean;
};

const CaptionedVideo = ({ src, maxHeight, caption, controls = true }: CaptionedVideoProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <video
        src={src}
        style={{ maxHeight, maxWidth: '100%' }}
        playsInline
        autoPlay
        controls={controls}
        muted
        loop
      />
      {/* <figcaption> */}
        <i className="caption">{caption}</i>
      {/* </figcaption> */}
    </div>
  )
};

export default CaptionedVideo;