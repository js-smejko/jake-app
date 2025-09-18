import { forwardRef } from "react";
import type { FloatImageProps } from "../util/interfaces";

const FloatImage = forwardRef<HTMLSpanElement, FloatImageProps>((
  { src, alt, caption, float }, 
  ref
) => {
  let className = 'captioned-image-container';

  if (float === 'left') {
    className += ' float-left';
  } else if (float === 'right') {
    className += ' float-right';
  }

  return (
    <span ref={ref} className={className}>
      <img src={src} alt={alt} style={{ maxHeight: 200, width: '100%', objectFit: 'contain' }} />
      {caption && <i>{typeof caption === "string" ? caption : alt}</i>}
    </span>
  )
});

export default FloatImage;