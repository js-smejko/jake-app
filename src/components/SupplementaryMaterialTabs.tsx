import { useRef, useState } from 'react';
// import * as assets from '../assets/dissertation/dissertation.index';
import TabNavigation from './TabNavigation';
import CaptionedImageRow from './CaptionedImageRow';
import CaptionedVideo from './CaptionedVideo';
import FloatImage from './FloatImage';
// import STLViewer from './STLViewer';

const SupplementaryMaterialTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("1. Quality");
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (tab: string) => {
    if (ref.current && ref.current.clientHeight > maxHeight) {
      setMaxHeight(ref.current.clientHeight);
    }
    setActiveTab(tab);
  };

  return (
    <TabNavigation
      tabs={["1. Quality", "2. Inference", "3. Tracking", "4. Triangulation", "5. Rewind", "6. Frame"]}
      tabRenderer={(tab) => (
        <button
          className={"tab" + (activeTab === tab ? " active" : "")}
          onClick={() => handleClick(tab)}
        >
          <span>{tab}</span>
        </button>
      )}
    >
      <div ref={ref} style={{ }}>
        {(() => {
          switch (activeTab) {
            case "1. Quality": return <>
              <p>
                To learn about DC's behaviour, surveillance of them had to be continuous, however, 
                their environment had highly limited access, which meant that while humans couldn't watch them, cameras had to.
                To make this footage available for review, UDP was used to stream the camera footage live from a Raspberry Pi host.
                Outsourcing the processing of this footage to a more powerful computer also allowed for more in-depth analysis, such as tracking,
                at the cost of resolution due to bandwidth limitations. Below, you can see that the resolution hit greatly compromised the detail in each frame.
              </p>
              <CaptionedImageRow
                images={[
                  { src: "/assets/dissertation/fish_2048.png", alt: "High resolution DC", caption: "2048x2048px" },
                  { src: "/assets/dissertation/fish_640.png", alt: "Low resolution DC", caption: "640x640px" }
                ]}
                caption="Detail of Danionella cerebrum when capturing at different resolutions: decreased resolution greatly increased the framerate."
                maxHeight={200}
              />
            </>
            case "2. Inference": return <>
              <p>
                In combat of low resolution, a well known neural network architecture, YOLO (You Only Look Once), was accessed via Ultralytics' open source library.
                In the lower left picture, it might not be apparent to you where the fish are, but it is clear that they are pinpointed by the neural network.
              </p>
              <CaptionedImageRow
                images={[
                  { src: "/assets/dissertation/before_inference.webp", alt: "Before inference" },
                  { src: "/assets/dissertation/inferences.webp", alt: "Inferences" }
                ]}
                maxHeight={640}
                caption="Before and after YOLO inference: fish barely visible to the human eye are pinpointed by the neural network."
              />
            </>
            case "3. Tracking": return <>
              <p>
                Knowing where the fish were in 2D wasn't enough - it was impossible to tell how close the fish were to the camera, hence, how far apart they really were.
                With inferences being made in two orthogonal frames, the next step was to pair the points between the two views to create 3D points.
                When side-by-side, cameras share an epipolar plane - in this case, this means that the same fish appears at a similar height in both views.
                Careful calibration of the cameras allowed the distinction of fish when swimming at different water depths: 
                once distinguished, individuals were tracked using their inter-frame movement rather than water depth, 
                immunising the 3D tracking to the confusion of schools at the same water level. 
                Below, the algorithm is demonstrated using an LED to model the fish. A view of each camera is shown alongside the algorithm's trace of the LED in 3D.
              </p>
              <CaptionedVideo
                src="/assets/dissertation/implemented_tracker.mp4"
                maxHeight="640px"
                caption="Tracking an LED in 3D - only the image detection model needs adapting for tracking DC instead"
              />
            </>
            case "4. Triangulation": return <>
              <p>
                To be certain of the 3D positions, calibration was performed using OpenCV functions.
                A bespoke routine was created to receive the UDP camera feeds and offer frames to OpenCV's chessboard corner detection.
                This meant that the technician (me) could wave a chessboard pattern at the cameras to collect calibration data at any time.
                This gathered intrinsic parameters for each camera, which describes the lens distortion and focal length.
                Next, extrinsic parameters would describe how the cameras were oriented in space relative to each other. 
                Using the assumption that just one LED was being moved in the scene, their relation could be determined by moving the LED in the scene.
                Given the cameras now remain in the same position, this extrinsic data would be valid for the duration of surveillance of DC.
              </p>
              <p>
                Below, the tracking algorithm traced the LED as it traversed the edges of the tank. 
                A reference image and before and after triangulation of the points is shown. 
              </p>
              <CaptionedImageRow
                images={[
                  { src: "/assets/dissertation/tank.webp", alt: "Tank", caption: true },
                  { src: "/assets/dissertation/uncalibrated_bounds.webp", alt: "Uncalibrated bounds", caption: true },
                  { src: "/assets/dissertation/triangulated_bounds.webp", alt: "Triangulated bounds", caption: true }
                ]}
                maxHeight={640}
                caption="Direct pairing of points vs. triangulation of points from independent 2D localisation of an LED in canon orthogonal views.
                  The LED was used to trace the bounds of the tank to demonstrate the skew of points."
              />
            </>
            case "5. Rewind": return <>
              <p>
                To eventually digitally review the tracking data was an extremely ambitious goal in the project's timeframe, 
                meaning that human intervention was still required, and immediately useful to my stakeholder.
                As a result, HLS was implemented to allow live and retrospective viewing of the camera feeds.
                The video below demonstrates roughly 30 minutes of footage backlog being reviewed, with both cameras focused on a digital clock to show the time.
                Extension of this backlog simply required a new set of parameters, at the cost of storage space,
                which is no imposition to the client.
              </p>
              <CaptionedVideo
                src="/assets/dissertation/rewind_demo.mp4"
                maxHeight="640px"
                caption="A demonstration of 30 minutes' surveillance backlog - both cameras are focused on a digital clock"
              />
            </>
            case "6. Frame": return <>
              <p>
                Lighting differences between viewing sessions meant for continuous recalibration of the cameras and retraining of the neural network,
                which couldn't be done in real-time. In combat of this, a permanent solution was devised, which would see the cameras permanently mounted to a frame.
                This frame could then remain in the laboratory outside of visitation hours. Although this was never printed due to time constraints and sheer size,
                the design is shown below.
              </p>
              <FloatImage
                src="/assets/dissertation/frame.webp"
                alt="Camera frame design"
                caption="The camera frame design. Cameras are mounted to the foremost arms; their weight will press the rearmost hooks against the base of the fish tank to secure it."
              />
              <a href="/assets/dissertation/frame.stl" download>Download the STL</a>
            </>
            default: return (
              <div>Select a tab to view supplementary material</div>
            );
          }
        })()}
      </div>
    </TabNavigation>
  );
}

export default SupplementaryMaterialTabs;