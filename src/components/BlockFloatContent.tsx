import { useEffect, useRef, useState } from "react";
import type { FloatImageProps } from "../util/interfaces";
import FloatImage from "./FloatImage";

interface ImageParagraphProps extends FloatImageProps {
  children?: React.ReactNode;
};

const BlockFloatContent = ({ src, alt, caption, float, children }: ImageParagraphProps) => {
  const [minHeight, setMinHeight] = useState(0);
  const imgRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const imgRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === imgRef.current) {
          setMinHeight(
            entry.contentRect.height + 
            parseFloat(window.getComputedStyle(imgRef.current).fontSize)
          );
        }
      }
    });

    imgRO.observe(imgRef.current);

    return () => {
      imgRO.disconnect();
    };
  }, []);

  return (
    <div style={{ minHeight }}>
      <FloatImage
        ref={imgRef}
        src={src}
        alt={alt}
        caption={caption}
        float={float}
      />
      {children}
    </div>
  );
};

export default BlockFloatContent;