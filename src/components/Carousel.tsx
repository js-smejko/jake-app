import { useEffect, useMemo, useRef, useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  maxHeight?: number;
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

const Carousel = ({ children, maxHeight }: CarouselProps) => {
  const [{ top, left, width }, setRelativeRect] = useState<DOMRect>(new DOMRect());
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

  const slideWidth = useMemo(() => (
    width + 16
  ), [width]);

  useEffect(() => {
    if (!relativeRef.current || !absoluteRef.current) return;

    const relativeRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setRelativeRect(entry.contentRect);
        }
      }
    });

    const absoluteRO = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height) {
          setHeight(prev => entry.contentRect.height <= (maxHeight ?? 1000) 
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
    if (delta > 0.5 * slideWidth) {
      setTranslateX(0);
    } else if (delta < -0.5 * slideWidth) {
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
      ref={relativeRef}
      style={{
        position: "relative",
        height: height
      }}
    >
      <div
        ref={absoluteRef}
        style={{
          display: "flex",
          position: "absolute",
          top, left,
          transform: `translateX(${translateX}px)`,
          transition: isTransitionEnabled ? "transform 0.3s ease" : "none",
          gap: "16px",
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
              display: "flex",
              height,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {child}
            <h2>{key + 1}</h2>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top, left, width, height,
          zIndex: 1
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </div>
  );
};

export default Carousel;