import { useCarouselAutoplay } from "../util/hooks";
import CaptionedVideo from "./captionedFootage/CaptionedVideo";
import Carousel from "./carousel/Carousel";

const HighlightsCarousel = () => {
  const { videoRefs, handleSlideChange } = useCarouselAutoplay();

  return (
    <Carousel
      className="carousel"
      onSlideChange={handleSlideChange}
    >
      <div>
        <h4>A small vehicle autonomously navigating a track using an array of infrared emitter/sensor pairs</h4>
        <CaptionedVideo 
          src="assets/autonomousVehicle/ir_navigation.mp4"
          maxHeight={600}
          ref={el => { 
            if (el) videoRefs.set(0, { current: el }) 
          }}
        />
      </div>
      <div>
        <h4>3D tracking of items using canon orthogonal camera feeds and image detection neural networks, transferred via UDP from a Raspberry Pi</h4>
        <CaptionedVideo 
          src="assets/dissertation/implemented_tracker.mp4" 
          maxHeight={600}
          ref={el => { 
            if (el) videoRefs.set(1, { current: el }) 
          }}
        />
      </div>
      <div>
        <h4>A CAD viewing software rendering STL with dynamic level of detail based on items in focus</h4>
        <CaptionedVideo 
          src="assets/CADSoftware/stl_video.mp4"
          maxHeight={600} 
          ref={el => {
            if (el) videoRefs.set(2, { current: el })
          }}
        />
      </div>
    </Carousel>
  )
};

export default HighlightsCarousel;