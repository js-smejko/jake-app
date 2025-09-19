import { useEffect, useState } from "react";
import type { ImageProps } from "../util/interfaces";

const GAP = 10;

interface ImageData extends ImageProps {
  aspect: number;
}

interface CaptionedImageProps {
  images: ImageProps[];
  caption?: string | boolean;
  maxHeight?: number; // px height limit (optional)
}

const CaptionedImageRow = ({ images, caption, maxHeight }: CaptionedImageProps) => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all<ImageData>(
      images.map(
        (img) =>
          new Promise<ImageData>((resolve) => {
            const image = new Image();
            image.src = img.src;
            image.onload = () =>
              resolve({
                ...img,
                aspect: image.naturalWidth / image.naturalHeight,
              });
          })
      )
    ).then((data) => {
      if (!cancelled) {
        setImageData(data);
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [images]);

  if (!ready) return null;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: GAP,
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {imageData.map((img, i) => (
          <figure
            key={img.src + i}
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              flexGrow: img.aspect,   // proportional to aspect ratio
              flexShrink: img.aspect,
              flexBasis: 0,           // lets flexGrow decide actual width
            }}
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              // loading="lazy"
              // decoding="async"
              // draggable={false}
              style={{
                width: "100%",              // fills flexed width
                height: "auto",
                maxHeight: maxHeight ? `${maxHeight}px` : "none",
                objectFit: "contain",
                display: "block",
              }}
            />
            {img.caption && (
              <figcaption
                style={{
                  fontSize: 12,
                  color: "#929292ff",
                  marginTop: 6,
                }}
              >
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      {caption && (
        <i style={{ marginTop: 6, fontSize: 13, color: "#929292ff" }}>{caption}</i>
      )}
    </div>
  );
};

export default CaptionedImageRow;
