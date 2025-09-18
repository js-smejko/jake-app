import { useState, useEffect, useRef } from "react";
import type { ImageProps } from "../util/interfaces";

const GAP = 10;

interface ImageData extends ImageProps {
  aspect: number;
}

interface CaptionedImageProps {
  images: ImageProps[];
  caption?: string;
  maxHeight?: string;
}

const CaptionedImageRow = ({ images, maxHeight, caption }: CaptionedImageProps) => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [totalAspect, setTotalAspect] = useState(0);
  const [totalGap, setTotalGap] = useState(0);
  const [relativeHeight, setRelativeHeight] = useState(maxHeight || "auto");
  const relativeRef = useRef<HTMLDivElement>(null);
  const absoluteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!relativeRef.current || !absoluteRef.current) return;

    const relativeRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    const absoluteRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height) {
          setRelativeHeight(`${entry.contentRect.height}px`);
        }
      }
    });

    relativeRO.observe(relativeRef.current);
    absoluteRO.observe(absoluteRef.current);

    return () => {
      relativeRO.disconnect();
      absoluteRO.disconnect();
    };
  }, []);

  useEffect(() => {
    Promise.all<ImageData>(
      images.map(
        (img) =>
          new Promise<ImageData>((resolve) => {
            const image = new Image();
            image.src = img.src;
            image.onload = () =>
              resolve({
                ...img,
                aspect: image.naturalWidth / image.naturalHeight
              });
          })
      )
    ).then(data => {
      setImageData(data);
      setTotalAspect(data.reduce((sum, { aspect }) => sum + aspect, 0));
      setTotalGap((data.length - 1) * GAP);
    });
  }, [images]);

  useEffect(() => {
    if (absoluteRef.current) {
      setRelativeHeight(`${absoluteRef.current.offsetHeight}px`);
    }
  }, [absoluteRef.current]);

  const availableWidth = containerWidth - totalGap;

  return (
    <span
      ref={relativeRef}
      style={{
        display: "inline-block",
        width: "100%",
        height: absoluteRef.current
          ? relativeHeight
          : "auto",
      }}
    >
      <span
        ref={absoluteRef}
        style={{
          width: "min-content",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {containerWidth ? <>
          <span style={{ display: "flex", flexDirection: "row", gap: GAP }}>
            {imageData.map((img, i) => (
              <span key={i} style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    maxHeight,
                    width: (availableWidth * img.aspect) / totalAspect,
                    objectFit: "contain",
                  }}
                />
                {img.caption && <i>{typeof img.caption === "string" ? img.caption : img.alt}</i>}
              </span>
            ))}
          </span>
          {caption && <i>{caption}</i>}
        </> : null}
      </span>
    </span>
  );
};

export default CaptionedImageRow;
