interface CaptionedVideoProps {
  src: string;
  maxHeight?: number | string;
  caption?: string;
};

const CaptionedVideo = ({ src, maxHeight, caption }: CaptionedVideoProps) => {
  return (
    <div style={{ flexDirection: 'column' }}>
      <video
        src={src}
        style={{ maxHeight, maxWidth: '100%' }}
        playsInline
        autoPlay
        controls
        muted
        loop
      />
      <div>
        <i>{caption}</i>
      </div>
    </div>
  )
};

export default CaptionedVideo;