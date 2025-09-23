import { useEffect, useRef, useState } from "react";

interface FloatImageProps {
  src: string;
  alt: string;
  caption?: string | boolean;
  float?: "left" | "right";
}

const FloatImage = ({
  src,
  alt,
  caption,
  float
}: FloatImageProps) => {
  const localRef = useRef<HTMLSpanElement>(null);
  const [shouldClear, setShouldClear] = useState(false);

  const adjustClear = () => {
    if (!localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();

    const spaceForText =
      float === "left"
        ? window.innerWidth - rect.right
        : rect.left;

    setShouldClear(spaceForText < 200);
  };

  useEffect(() => {
    adjustClear();
    window.addEventListener("resize", adjustClear);
    return () => window.removeEventListener("resize", adjustClear);
  }, []);

  let className = "captioned-image-container";
  if (float === "left") className += " float-left";
  if (float === "right") className += " float-right";

  return (
    <>
      <span ref={localRef} className={className}>
        <img
          src={src}
          alt={alt}
          style={{
            maxHeight: 200,
            maxWidth: "100%",
            objectFit: "contain",
          }}
          draggable={false}
        />
        {caption && (
          <i className="caption">
            {typeof caption === "string" ? caption : alt}
          </i>
        )}
      </span>
      {shouldClear && <div style={{ clear: "both" }} />}
    </>
  );
};

export default FloatImage;
