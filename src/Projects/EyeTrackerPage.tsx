import BlockFloatContent from "../components/BlockFloatContent";

const EyeTrackerPage = () => {
  return <>
    <h2>Eye Tracking Project</h2>
    <i>
      This project was completed by my friend Yusuf Shaikh as his final year project at the University of Nottingham.
      Here is his first-hand account of the remarkable achievement and the influence that I (Jake) had on it.
    </i>
    <BlockFloatContent
      src="/assets/eyeTracking/eye_tracking.webp"
      alt="A photo of the human eye in motion using an event camera"
      float="left"
      caption
    >
      <p>
        
      </p>
    </BlockFloatContent>
  </>
};

export default EyeTrackerPage;