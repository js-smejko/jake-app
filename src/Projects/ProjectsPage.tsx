import ProjectPreview from "../components/ProjectPreview";
import { MAIN_NAVIGATION_PARAMS } from "../constants";

const ProjectsPage = () => {
  const projects = MAIN_NAVIGATION_PARAMS.find(param =>
    param.link.title === "Projects"
  )?.subLinks as { title: string; link: string; img: string; }[] | undefined;

  if (!projects) return null;

  return <>
    <ul className="empty-list preview-list">
      {projects.map(project => (
        <ProjectPreview
          key={project.title}
          src={project.img}
          title={project.title}
          url={project.link}
        />
      ))}
    </ul>
  </>;
};

export default ProjectsPage;