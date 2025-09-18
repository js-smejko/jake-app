import { type JSX } from "react";

interface TabNavigationProps {
  tabs?: string[];
  tabRenderer: (tab: string, idx: number) => JSX.Element;
  children?: React.ReactNode;
};

const TabNavigation = ({ tabs, tabRenderer, children }: TabNavigationProps) => {
  return (
    <div>
      <nav
        style={{ position: "relative", display: "flex", justifyContent: "center" }}
      >
        <ul className="empty-list tab-list">
          {tabs?.map((tab, idx) => (
            <li key={idx} style={{ flex: 1, display: "flex" }}>
              {tabRenderer(tab, idx)}
            </li>
          ))}
        </ul>
        <div
          className="border-top"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -3,
            height: 3,
            pointerEvents: "none",
          }}
        />
      </nav>
      <div className="content">{children}</div>
    </div>
  );
};

export default TabNavigation;