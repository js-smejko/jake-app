import { useEffect, useMemo, useRef, useState } from "react";
import DotNavigation from "./DotNavigation";
import classes from "./Carousel.module.css";

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: number;
  gap?: number;
}

function circularSlice<T>(arr: T[], start: number, length: number): T[] {
  const result: T[] = [];
  const n = arr.length;

  let normalizedStart = ((start % n) + n) % n;

  for (let i = 0; i < length; i++) {
    result.push(arr[(normalizedStart + i) % n]);
  }

  return result;
}

const Carousel = ({ children, className, style, maxHeight = 2000, gap = 16 }: CarouselProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const relativeRef = useRef<HTMLDivElement>(null);
  const absoluteRef = useRef<HTMLDivElement>(null);

  const keyedChildren = useMemo(() =>
    children.map((child, index) => ({ child, key: index })
    ), [children]);

  const slideWidth = width + gap;

  useEffect(() => {
    setTranslateX(-slideWidth);
  }, [width]);

  useEffect(() => {
    if (!relativeRef.current || !absoluteRef.current) return;

    const relativeRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    const absoluteRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height) {
          setHeight(prev => entry.contentRect.height <= maxHeight
            ? Math.max(prev, entry.contentRect.height)
            : prev
          );
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

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - startX;
    setTranslateX(-slideWidth + delta);
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitionEnabled(true);

    const delta = clientX - startX;
    if (delta > 0.1 * slideWidth) {
      setTranslateX(0);
    } else if (delta < -0.1 * slideWidth) {
      setTranslateX(-2 * slideWidth);
    } else {
      setTranslateX(-slideWidth);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitionEnabled(false);
    setCurrentIndex(
      translateX === 0
        ? (currentIndex - 1 + keyedChildren.length) % keyedChildren.length
        : translateX === -slideWidth * 2
          ? (currentIndex + 1) % keyedChildren.length
          : currentIndex
    );
    setTranslateX(-slideWidth);
    const videos = absoluteRef.current?.querySelectorAll("video");
    console.log(videos?.length);
    videos?.forEach(video => {
      // video.pause();
      // video.currentTime = 0;
      video.play();
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = (e: React.MouseEvent) => handleDragEnd(e.clientX);

  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    const clientX = e.touches[0].clientX;
    const delta = clientX - startX;
    if (Math.abs(delta) > 10) {
      handleDragMove(clientX);
      e.preventDefault();
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => handleDragEnd(e.changedTouches[0].clientX);

  return (
    <div 
      className={className}
      style={{
        overflow: "hidden",
        ...style
      }}
    >
      <div
        ref={relativeRef}
        style={{
          position: "relative",
          height
        }}
      >
        <div
          ref={absoluteRef}
          style={{
            display: "flex",
            position: "absolute",
            transform: `translateX(${translateX}px)`,
            transition: isTransitionEnabled ? "transform 0.3s ease" : "none",
            gap,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {circularSlice(
            keyedChildren,
            currentIndex - 1, 3
          ).map(({ child, key }) => (
            <div
              key={key}
              style={{
                width,
                userSelect: "none",
                minHeight: height
              }}
            >
              {child}
            </div>
          ))}
        </div>
        <div
          className={classes["carousel-gesture-overlay"]}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <button
            className={classes["carousel-button"]}
            onClick={() => setCurrentIndex((currentIndex - 1 + keyedChildren.length) % keyedChildren.length)}
          >
            &lt;
          </button>
          <button
            className={classes["carousel-button"]}
            onClick={() => setCurrentIndex((currentIndex + 1) % keyedChildren.length)}
          >
            &gt;
          </button>
        </div>
      </div>
      <DotNavigation
        numDots={keyedChildren.length}
        currentIndex={currentIndex}
        onChange={setCurrentIndex}
      />
    </div>
  );
};

export default Carousel;