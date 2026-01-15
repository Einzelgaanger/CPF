import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });

    // Also scroll the main content area if it's scrollable
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    }

    // Scroll any scrollable containers (like divs with overflow)
    const scrollableContainers = document.querySelectorAll("[data-scroll-container]");
    scrollableContainers.forEach((container) => {
      if (container instanceof HTMLElement) {
        container.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant" as ScrollBehavior,
        });
      }
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
