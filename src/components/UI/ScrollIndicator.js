import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

const IndicatorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.1);
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  transform-origin: 0%;
`;

const ScrollToTop = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 998;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
`;

const SectionIndicator = styled.div`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 998;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SectionDot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${({ theme, active }) => 
    active ? theme.colors.primary : 'rgba(255, 255, 255, 0.3)'
  };
  background: ${({ theme, active }) => 
    active ? theme.colors.primary : 'transparent'
  };
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.2);
  }

  &:after {
    content: '';
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 0.8rem;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
    white-space: nowrap;
    pointer-events: none;
    content: attr(data-label);
  }

  &:hover:after {
    opacity: 1;
  }
`;

const ScrollIndicator = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Determine active section
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <IndicatorContainer>
        <ProgressBar style={{ scaleX }} />
      </IndicatorContainer>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ScrollToTop
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hoverable"
        >
          ↑
        </ScrollToTop>
      </motion.div>

      <SectionIndicator>
        {sections.map((section, index) => (
          <SectionDot
            key={section.id}
            active={activeSection === section.id}
            onClick={() => scrollToSection(section.id)}
            data-label={section.label}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="hoverable"
          />
        ))}
      </SectionIndicator>
    </>
  );
};

export default ScrollIndicator;