import MainNavigationDropdown from "./MainNavigationDropdown";
import classes from "./MainNavigation.module.css";
import { MAIN_NAVIGATION_PARAMS } from "../constants";
import { forwardRef } from "react";

const MainNavigation = forwardRef<HTMLDivElement>((_, ref) => {
  return <>
    <nav ref={ref} className={classes["main-navigation"]}>
      <ul className={"empty-list " + classes["navigation-list"]}>
        {MAIN_NAVIGATION_PARAMS.map(({ link, subLinks }, idx) => (
          <li key={link.link} style={{ flex: 1 }}>
            <MainNavigationDropdown
              link={link}
              subLinks={subLinks}
              isLast={idx === MAIN_NAVIGATION_PARAMS.length - 1}
            />
          </li>
        ))}
      </ul>
    </nav>
  </>;
});

export default MainNavigation;