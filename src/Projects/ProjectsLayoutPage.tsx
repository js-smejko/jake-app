import { NavLink, Outlet, useLocation, type NavLinkRenderProps } from "react-router-dom";
import TabNavigation from "../components/tabNavigation/TabNavigation";
import { MAIN_NAVIGATION_PARAMS } from "../constants";

const ProjectsLayoutPage = () => {
  const location = useLocation();

  const tabs = MAIN_NAVIGATION_PARAMS.find(param =>
    param.link.title === "Projects"
  )?.subLinks;

  const path = location.pathname.split("/")[2];

  const homeClassFn = ({ isActive }: NavLinkRenderProps) =>
    isActive ? "hidden" : "";

  if (!tabs) return null;

  return window.screen.width > 600 ? (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      <h1>Projects</h1>
      <p>More detail and pictures of project's I've undertaken</p>
      <TabNavigation
        tabs={tabs.map(({ title }) => title)}
        tabRenderer={(tab) => (
          <NavLink
            className="tab"
            to={tabs.find(({ title }) => title === tab)!.link}
          >
            {tab}
          </NavLink>
        )}
        selectedIdx={tabs.findIndex(({ link }) => link === path)}
      >
        <Outlet />
      </TabNavigation>
    </div>
  ) : <>
    <h1>Projects</h1>
    <Outlet />
    <NavLink className={homeClassFn} to="/projects" end>See all projects</NavLink>
  </>;
};

export default ProjectsLayoutPage;