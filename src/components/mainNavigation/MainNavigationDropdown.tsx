import { useRef, useState } from "react";
import classes from "./MainNavigation.module.css";
import { NavLink, type NavLinkRenderProps } from "react-router-dom";

interface LinkAndTitle {
  link: string;
  title: string;
  isIndependent?: boolean;
};

interface MainNavigationDropdownProps {
  link: LinkAndTitle;
  subLinks?: LinkAndTitle[];
  isLast?: boolean;
};

const MainNavigationDropdown = (
  { link, subLinks, isLast }: MainNavigationDropdownProps
) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const relativeRef = useRef<HTMLAnchorElement>(null);

  const classFn = ({ isActive }: NavLinkRenderProps) =>
    isActive ? `${classes["link"]} ${classes["active"]}` : classes["link"];

  const sublinkClassFn = ({ isActive }: NavLinkRenderProps) =>
    isActive ? `${classes["sublink"]} ${classes["active"]}` : classes["sublink"];

  const handleTouch = () => {
    if (isHovered) {
      setShouldClose(true);
    } else {
      setIsHovered(true);
    }
  }

  const handleAnimationEnd = () => {
    if (shouldClose) {
      setIsHovered(false);
      setShouldClose(false);
    }
  };

  return (
    <div
      className={classes.dropdown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NavLink
        onTouchEnd={handleTouch}
        ref={relativeRef}
        className={classFn}
        to={link.link}
      >
        {link.title}
      </NavLink>
      {isHovered && <div>
        <ul
          onAnimationEnd={handleAnimationEnd}
          className={`empty-list ${classes["dropdown-list"]} ${shouldClose ? classes["hide"] : ""}`}
          style={{ 
            width: relativeRef.current 
              ? relativeRef.current.clientWidth - (isLast ? 2 : 1) 
              : undefined 
          }}
        >
          {subLinks?.map(subLink => (
            <li key={subLink.link}>
              {subLink.isIndependent ? (
                <a 
                  className={classes["link"]}
                  href={subLink.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {subLink.title}
                </a>
              ) : (
                <NavLink 
                  onTouchEnd={handleTouch}
                  to={`${link.link}/${subLink.link}`}
                  className={sublinkClassFn}
                >
                  {subLink.title}
                </NavLink>
              )}
          </li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default MainNavigationDropdown;