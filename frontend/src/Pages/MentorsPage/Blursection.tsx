import React, { useEffect, useRef } from 'react';

interface BlurSectionProps {
  children: React.ReactNode;
  id: string;
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const BlurSection: React.FC<BlurSectionProps> = ({ children, id, activeSection, setActiveSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [id, setActiveSection]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-500 ease-out ${
        activeSection === id
          ? 'filter-none opacity-100 scale-100'
          : 'blur-sm opacity-50 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

export default BlurSection;