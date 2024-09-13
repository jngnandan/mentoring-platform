import React, { useRef, useEffect, useState } from "react";

const BlurSection = ({ children, id, activeSection, setActiveSection }) => {
  const sectionRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px",
        threshold: 0,
      }
    );

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportHeight / 2 - sectionCenter);
        const maxDistance = viewportHeight / 2;
        const newOpacity = 1 - Math.min(distanceFromCenter / maxDistance, 0.5);
        setOpacity(newOpacity);
      }
    };

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial call to set the opacity
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [id, setActiveSection]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-300 ease-out`}
      style={{
        opacity: opacity,
        filter: `blur(${(1 - opacity) * 5}px)`,
        transform: `scale(${0.95 + 0.05 * opacity})`,
      }}
    >
      {children}
    </div>
  );
};

export default BlurSection;
