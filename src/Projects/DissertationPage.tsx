import Demo from "../components/Demo";
import SupplementaryMaterialTabs from "../components/SupplementaryMaterialTabs";
import { MAIN_NAVIGATION_PARAMS } from "../constants";

const DissertationPage = () => {
  const documents = MAIN_NAVIGATION_PARAMS.find(nav =>
    nav.link.title === "Documents")?.subLinks;

  const dissertationLink = documents?.find(doc =>
    doc.title === "Dissertation")?.link;

  const feedbackLink = documents?.find(doc =>
    doc.title === "Dissertation Feedback")?.link;

  return (
    <div>
      <h2>Dissertation</h2>
      <p style={{ textAlign: 'center' }}>
        My final year project at the University of Nottingham saw the foundation of a novel system,
        an idea of Dr. Kevin Webb's which he supervised.
        The project was moderated by Dr. Peter Christopher and I am proud to have been
        <i>"one of the most enthusiastic communicators / advocates for a project [he's] ever seen".</i>
      </p>
      <p style={{ textAlign: 'center' }}>
        Supplementary material is captioned to give a rundown of the project's key features.
      </p>
      <h3>Abstract</h3>
      <p>
        University of Nottingham's developmental genetics department has recently introduced a new vertebrate fish, Danionella cerebrum (DC),
        however, its breeding habits have proven to be unusually unpredictable. In combat of this, Dr. Rob Wilkinson proposes to identify the behavioural cues exhibited by DC during procreation using AI.
        This project aims to facilitate this by creating a system to record and catalogue the fish's behaviour.
      </p>
      <h3>Supplementary Material</h3>
      <Demo />
      {/* <SupplementaryMaterialTabs /> */}
      <h3>
        Dissertation
        <a
          href={dissertationLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <small> (open in new tab)</small>
        </a>
      </h3>
      {window.screen.width >= 600 && (
        <iframe
          title="Dissertation"
          src={dissertationLink}
          height="600px"
          width="100%"
        />
      )}
      <h3>
        Feedback
        <a
          href={feedbackLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <small> (open in new tab)</small>
        </a>
      </h3>
      {window.screen.width >= 600 && (
        <iframe
          title="Feedback"
          src={feedbackLink}
          height="600px"
          width="100%"
        />
      )}
    </div>
  )
};

export default DissertationPage;