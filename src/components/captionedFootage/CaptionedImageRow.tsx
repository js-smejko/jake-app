import { useEffect, useState } from "react";
import type { ImageProps } from "../../util/interfaces";

import classes from "./footageFrames.module.css";

interface ImageData extends ImageProps {
  aspect: number;
}

interface CaptionedImageProps {
  images: ImageProps[];
  caption?: string | boolean;
  maxHeight?: number;
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
    <div className={classes['outer-container']}>
      <div className={classes['inner-container']}>
        {imageData.map((img, i) => (
          <figure
            key={img.src + i}
            style={{
              flexGrow: img.aspect,
              flexShrink: img.aspect,
            }}
          >
            <img
              src={img.src}
              alt={img.alt ?? ""}
              draggable={false}
              style={{
                maxHeight: maxHeight ? `${maxHeight}px` : "none",
              }}
            />
            {img.caption && (
              <figcaption className={classes.caption}>
                {typeof img.caption === "string" ? img.caption : img.caption && img.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      {caption && (
        <i className={classes.caption}>{caption}</i>
      )}
    </div>
  );
};

export default CaptionedImageRow;
