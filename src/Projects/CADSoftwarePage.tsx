import BlockFloatContent from "../components/BlockFloatContent";
// import * as assets from '../assets/CADSoftware/CADSoftware.index';
import CaptionedImageRow from "../components/CaptionedImageRow";
import CaptionedVideo from "../components/CaptionedVideo";

const CADSoftwarePage = () => {
  const ASSETS = '/assets/CADSoftware/';

  return <>
    <h2>CAD Software Project</h2>
    <i>The University of Nottingham's 2<sup>nd</sup> year project in 2024</i>
    <h3>Overview</h3>
    <BlockFloatContent
      src={ASSETS + 'main_window.webp'}
      alt="Main window of the CAD software"
      float="left"
    >
      <p>
        An environment was developed for the display and navigation of existing STL files.
        Special emphasis was placed on the ability to render a large quantity of independent actors without significant performance degradation,
        being left with three different levels of detail for the same design: the university's Formula Student race car.
      </p>
      <p>
        Qt was used for the GUI, programmed in C++ and built using CMake.
        The project was completed in teams of three, introducing GitHub for source control.
        I was given the task of writing the code, while others focused on creating an installer and serving documentation on Doxygen.
      </p>
    </BlockFloatContent>
    <h3>Optimisation</h3>
    <p>
      When viewing the folder structures of the provided STL, I noticed that the subdirectories in the most detailed version mostly coincided with the broader STL files in the lowest level.
      This meant that the contents of any given subdirectory in the highest detail could be swapped for its counterpart in the lowest detail when not in focus. 
    </p>
    <CaptionedImageRow 
      images={[
        { src: ASSETS + 'level0.webp', alt: "The least detailed folder", caption: true },
        { src: ASSETS + 'level2.webp', alt: "The most detailed folder", caption: true }
      ]}
      maxHeight={400}
    />
    <p>
      Rendering the lowest detail for items aside from those closest to the camera would give the impression of the highest detail with minimal computational cost,
      meaning both folders would be loaded, before the chunkier components were associated with their corresponding level in the logical tree of directories/files.
    </p>
    <BlockFloatContent
      src={ASSETS + 'tree_view.webp'}
      alt="Logical tree of directories and files"
      caption='The logical tree of directories and files - the parent, Cooling, also holds STL: "21-J-900-01_ASSY - COOLING.stl"'
    />
    <CaptionedImageRow
      images={[
        { src: ASSETS + 'level0_component.webp', alt: "Low detail rendering", caption: "Rendering the parent only, Cooling (21-J-900-01_ASSY - COOLING.stl)" },
        { src: ASSETS + 'level2_component.webp', alt: "High detail rendering", caption: "Rendering all of Cooling's children instead of the parent" }
      ]}
      maxHeight={400}
    />
    <p>
      Dynamic choice of the level of detail to render was then based on the geometric displacement of the camera from each parent component.
      A preferences menu was introduced to allow the user to decide how many parent entities would be rendered in high detail, defaulting to one but adjustable between zero and the count of parent components.
    </p>
    <BlockFloatContent
      src={ASSETS + 'pedal_selected.webp'}
      alt="The pedal box is selected and in high detail"
      float="right"
      caption
    >
      <p>
        Selected components in the tree view would take a different colour scheme and always render in the utmost detail.
        Additional features included global transparency and light intensity trackbars,
        applied here to grant a view of the selected pedals.
      </p>
    </BlockFloatContent>
    <BlockFloatContent
      src={ASSETS + 'clip_filter.webp'}
      alt="Shrink filter on the bodywork"
      float="left"
      caption
    >
      <p>
        Filters were available to individual components, including stackable shrink and clip filters.
      </p>
    </BlockFloatContent>
    <CaptionedVideo
      src={ASSETS + 'stl_video.mp4'}
      caption="A demonstration of the dynamic level of detail. The number of detailed entities is set to 1 here."
    />
  </>;
};

export default CADSoftwarePage;
