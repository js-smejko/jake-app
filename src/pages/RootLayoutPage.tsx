import { useEffect, useRef, useState } from "react";
import MainNavigation from "../components/mainNavigation/MainNavigation";
import { Outlet, useLocation } from "react-router-dom";

const RootLayoutPage = () => {
  const [top, setTop] = useState(0);

  const location = useLocation();
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

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return <>
    <MainNavigation ref={navRef} />
    <main
      style={{
        marginTop: top,
        padding: '0 1rem',
        maxWidth: Math.max(960, window.innerWidth * 0.75),
      }}
    >
      <Outlet />
      <footer style={{ marginBlock: '1rem' }}>
        <div>
          <button 
            onClick={scrollToTop} 
            className="back-to-top"
          >
            Back to top
          </button>
        </div>
        <p style={{ textAlign: 'right' }}>Jake Smejko 2025</p>
        <p style={{ textAlign: 'right' }}><a href="mailto:jsmejko@outlook.com">jsmejko@outlook.com</a></p>
      </footer>
    </main>
  </>
};

export default RootLayoutPage;