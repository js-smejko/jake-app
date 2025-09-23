import { type JSX } from "react";
import classes from "./TabNavigation.module.css";

interface TabNavigationProps {
  tabs?: string[];
  selectedIdx?: number;
  children?: React.ReactNode;
  tabRenderer: (tab: string, idx: number) => JSX.Element;
};

const TabNavigation = ({ tabs, selectedIdx, tabRenderer, children }: TabNavigationProps) => {  
  return (
    <div>
      <nav
        style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
      >
        <ul className={`empty-list ${classes['tab-list']}`}>
          {tabs?.map((tab, idx) => (
            <li 
              key={idx} 
              style={{ flex: 1, display: 'flex' }} 
              className={
                selectedIdx === idx
                  ? `${classes['tab']} ${classes['active']}`
                  : classes['tab']
              }
            >
              <span>{tabRenderer(tab, idx)}</span>
            </li>
          ))}
        </ul>
        <div
          className={classes['border-top']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -3,
            height: 3,
            pointerEvents: 'none',
          }}
        />
      </nav>
      <div className={classes['content']}>{children}</div>
    </div>
  );
};

export default TabNavigation;