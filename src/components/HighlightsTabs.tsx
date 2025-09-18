import { useRef, useState } from "react";
import TabNavigation from "./TabNavigation";
import CaptionedVideo from "./CaptionedVideo";

const HighlightsTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (tab: number) => {
    if (ref.current && ref.current.clientHeight > maxHeight) {
      setMaxHeight(ref.current.clientHeight);
    }
    setActiveTab(tab);
  };

  const tabs = [
    "3D tracking of items using canon orthogonal camera feed, transferred via UDP from a Raspberry Pi",
    "A small vehicle autonomously navigating a track using an array of infrared emitter/sensor pairs",
    "A CAD viewing software rendering STL with dynamic level of detail based on items in focus"
  ];

  return (
    <TabNavigation
      tabs={tabs}
      tabRenderer={(tab, idx) => (
        <button
          className={"tab" + (activeTab === idx ? " active" : "")}
          onClick={() => handleClick(idx)}
        >
          <span>{tab}</span>
        </button>
      )}
    >
      <div ref={ref} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: maxHeight }}>
        {(() => {
          switch (activeTab) {
            case 0:
              return <CaptionedVideo src={"assets/dissertation/implemented_tracker.mp4"} />;
            case 1:
              return <CaptionedVideo src={"assets/autonomousVehicle/ir_navigation.mp4"} />;
            case 2:
              return <CaptionedVideo src={"assets/CADSoftware/stl_video.mp4"} />;
            default:
              return <div>Select a tab to see more</div>;
          }
        })()}
      </div>
    </TabNavigation>
  )
};

export default HighlightsTabs;