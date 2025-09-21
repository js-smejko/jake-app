import { useRef, useState } from "react";
import classes from "./Carousel.module.css";
import { circularNext, circularPrev } from "./Carousel.util";

interface DotNavigationProps {
  numDots: number;
  currentIndex: number;
  onChange: (index: number) => void;
};

const DotNavigation = ({ numDots, currentIndex, onChange }: DotNavigationProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const dotsRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !dotsRef.current) return;
    const { left, width } = dotsRef.current.getBoundingClientRect();
    onChange(Math.max(Math.min(Math.floor((clientX - left) / (width / numDots)), numDots - 1), 0));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <button
        className={classes["carousel-button"]}
        onClick={() => onChange(circularPrev(currentIndex, numDots))}
      >
        &lt;
      </button>
      <div className={classes["navigation-container"]}>
        <div
          className={classes["gesture-overlay"]}
          ref={dotsRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          onTouchCancel={handleDragEnd}
        />
        {Array.from({ length: numDots }).map((_, i) =>
          <span
            key={i}
            className={classes.dot}
            style={{
              backgroundColor: i === currentIndex ? "#ccc" : "#808080ff",
            }}
            draggable={false}
          />
        )}
      </div>
      <button
        className={classes["carousel-button"]}
        onClick={() => onChange(circularNext(currentIndex, numDots))}
      >
        &gt;
      </button>
    </div>
  )
};

export default DotNavigation;