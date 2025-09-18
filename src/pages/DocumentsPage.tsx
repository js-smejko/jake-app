import DocumentLinkPreview from "../components/DocumentLinkPreview";
import { MAIN_NAVIGATION_PARAMS } from "../constants";

const DocumentsPage = () => {
  const documents = MAIN_NAVIGATION_PARAMS.find(param =>
    param.link.title === "Documents"
  )?.subLinks;

  if (!documents) return null;

  return <>
    <h2>Links below will open as PDFs in a new tab</h2>
    <ul className="empty-list preview-list">
      <DocumentLinkPreview 
        img="assets/dissertation/fish_2048.webp"
        alt="Fish"
        links={[
          {
            title: "Dissertation",
            url: "assets/documents/dissertation.pdf"
          },
          {
            title: "Dissertation Feedback",
            url: "assets/documents/feedback.pdf"
          }
        ]}
      />
      <DocumentLinkPreview
        img="assets/general/grad_ball.webp"
        alt="My friends and I at the Grad Ball"
        links={[
          {
            title: "Degree Transcript",
            url: "assets/documents/degree_transcript.pdf"
          },
          {
            title: "Degree Certificate",
            url: "assets/documents/degree_certificate.pdf"
          }
        ]}
      />
      <DocumentLinkPreview 
        img="assets/general/guitar.webp"
        alt="Guitar Grade 8 Certificate"
        links={[
          {
            title: "Guitar Grade 8 Certificate",
            url: "assets/documents/guitar_grade_8.pdf"
          }
        ]}
      />
    </ul>
  </>;
};

export default DocumentsPage;