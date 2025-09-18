import { useEffect, useMemo, useRef, useState } from "react";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel = ({ children }: CarouselProps) => {
  const [{ top, left, width }, setRelativeRect] = useState<DOMRect>(new DOMRect());
  const [height, setHeight] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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
          setHeight(entry.contentRect.height);
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
    setTranslateX(-currentIndex * slideWidth);
  }, [currentIndex, slideWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setTranslateX(-currentIndex * slideWidth + delta);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    if (Math.abs(delta) > 10) {
      setTranslateX(-currentIndex * slideWidth + delta);
      e.preventDefault();
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const delta = e.clientX - startX;
    if (delta > 0.5 * slideWidth && currentIndex > 0) {
      setCurrentIndex(prev => {
        return prev - 1;
      });
    } else if (delta < -0.5 * slideWidth && currentIndex < children.length - 1) {
      setCurrentIndex(prev => {
        return prev + 1;
      });
    } else {
      setTranslateX(-currentIndex * slideWidth);
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const delta = e.changedTouches[0].clientX - startX;
    if (delta > 0.5 * slideWidth && currentIndex > 0) {
      setCurrentIndex(prev => {
        return prev - 1;
      });
    } else if (delta < -0.5 * slideWidth && currentIndex < children.length - 1) {
      setCurrentIndex(prev => {
        return prev + 1;
      });
    } else {
      setTranslateX(-currentIndex * slideWidth);
    }
  };

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
          transition: isDragging ? "none" : "transform 0.3s ease",
          gap: "16px",
        }}
      >
        {keyedChildren.map(({ child, key }) => (
          <div 
            key={key} 
            style={{ 
              width,
              userSelect: "none"
            }}
          >
            {child}
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