import { useEffect, useRef, useState } from "react";
import type { CaptionedFloatFootageProps } from "./captionedFootage.interfaces";

const CaptionedFloatFootage = ({
  children,
  alt,
  caption,
  float,
}: CaptionedFloatFootageProps) => {
  const localRef = useRef<HTMLDivElement>(null);
  const [shouldClear, setShouldClear] = useState(false);

  const adjustClear = () => {
    if (!localRef.current) return;
    const rect = localRef.current.getBoundingClientRect();

    const spaceForText =
      float === 'left'
        ? window.innerWidth - rect.right
        : rect.left;

    setShouldClear(spaceForText < 200);
  };

  useEffect(() => {
    if (!localRef.current) return;

    const RO = new ResizeObserver(adjustClear);
    RO.observe(localRef.current);

    return () => {
      RO.disconnect();
    };
  }, []);

  let className = 'captioned-image-container';
  if (float === 'left') className += ' float-left';
  if (float === 'right') className += ' float-right';

  return <>
    <figure ref={localRef} className={className}>
      {children}
      {caption && (
        <figcaption className="caption">
          {typeof caption === 'string' ? caption : alt}
        </figcaption>
      )}
    </figure>
    {shouldClear && <div style={{ clear: 'both' }} />}
  </>;
};

export default CaptionedFloatFootage;
