import DocumentsTabs from "../components/DocumentsTabs";
import DocumentsPage from "./DocumentsPage";

const DocumentsLayoutPage = () => {
  return <>
    <h1>Documents</h1>
    {window.screen.width > 600 ? <>
      <h2>Press on a tab to preview a document</h2>
      <DocumentsTabs />
    </> : (
      <DocumentsPage />
    )}
  </>;
};

export default DocumentsLayoutPage;