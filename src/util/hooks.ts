import { useEffect } from "react";

export const useCarouselAutoplay = () => {
  const videoRefs = new Map<number, React.RefObject<HTMLVideoElement>>();
  
  useEffect(() => {
    videoRefs.get(0)?.current?.play();
  }, [videoRefs]);

  const handleSlideChange = (i: number) => {
    videoRefs.forEach((r, idx) => {
      if (r.current === null) return;
      if (idx !== i) {
        r.current.pause();
        r.current.currentTime = 0;
      } else {
        r.current.play();
      }
    });
  };

  return { videoRefs, handleSlideChange };
};