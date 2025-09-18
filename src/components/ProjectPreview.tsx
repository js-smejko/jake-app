import { Link } from "react-router-dom";
import FloatImage from "./FloatImage";

interface ProjectPreviewProps {
  src: string;
  title: string;
  url: string;
};

const ProjectPreview = ({ src, title, url }: ProjectPreviewProps) => {
  return (
    <li style={{ width: "100%" }}>
      <Link to={url} className="project-link">
        <FloatImage
          src={src}
          alt={title}
        />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h4>{title}</h4>
        </div>
      </Link>
    </li>
  )
};

export default ProjectPreview;