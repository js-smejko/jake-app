import MainNavigation from "../MainNavigation/MainNavigation";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const [top, setTop] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const RO = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === navRef.current) {
          setTop(entry.contentRect.height);
        }
      }
    });

    RO.observe(navRef.current);

    return () => {
      RO.disconnect();
    };
  }, []);

  return <>
    <MainNavigation ref={navRef} />
    <main
      style={{
        marginTop: top,
        padding: "0 1rem",
        maxWidth: Math.max(960, window.innerWidth * 0.75),
      }}
    >
      <h1>404 - Page Not Found</h1>
      <h2>Head <Link to="/">Home</Link></h2>
      <footer style={{ marginBlock: "1rem" }}>
        <p style={{ textAlign: "right" }}>Jake Smejko 2025</p>
        <p style={{ textAlign: "right" }}><a href="mailto:jsmejko@outlook.com">jsmejko@outlook.com</a></p>
      </footer>
    </main>
  </>
};

export default ErrorPage;