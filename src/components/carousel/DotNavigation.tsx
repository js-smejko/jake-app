import { useRef, useState } from "react";

interface DotNavigationProps {
  numDots: number;
  currentIndex: number;
  onChange: (index: number) => void;
};

const DotNavigation = ({ numDots, currentIndex, onChange: setCurrentIndex }: DotNavigationProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const dotsRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging || !dotsRef.current) return;
    const { left, width } = dotsRef.current.getBoundingClientRect();
    setCurrentIndex(Math.max(Math.min(Math.floor((clientX - left) / (width / numDots)), numDots - 1), 0));
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
        justifyContent: "center",
        // userSelect: "none",
      }}
      >
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center",
          paddingBlock: 16,
          // userSelect: "none",
        }}
        ref={dotsRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onTouchCancel={handleDragEnd}
      >

        {Array.from({ length: numDots }).map((_, i) =>
          <span
            key={i}
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: i === currentIndex ? "#ccc" : "#808080ff",
              margin: 4,
              transition: "background-color 0.3s ease",
              // userSelect: "none",
            }}
            // onClick={() => setCurrentIndex(i)}
          />
        )}
      </div>
    </div>
  )
};

export default DotNavigation;