import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navigation from '../components/Layout/Navigation';
import Hero from '../components/Sections/Hero';
import About from '../components/Sections/About';
import Projects from '../components/Sections/Projects';
import Contact from '../components/Sections/Contact';
import ScrollIndicator from '../components/UI/ScrollIndicator';
import RealCryptoTicker from '../components/UI/RealCryptoTicker';
import RealWeb3Connect from '../components/UI/RealWeb3Connect';
import TerminalCursor from '../components/UI/TerminalCursor';
import GlitchTransition from '../components/UI/GlitchTransition';
import SmartContractInteraction from '../components/UI/SmartContractInteraction';

const HomeContainer = styled.div`
  position: relative;
  overflow-x: hidden;
`;

const CustomCursor = styled(motion.div)`
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showTransition, setShowTransition] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    
    const hoverElements = document.querySelectorAll('button, a, .hoverable');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <HomeContainer>
      <CustomCursor
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      
      <Navigation />
      <ScrollIndicator />
      
      <section id="home">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="projects">
        <Projects />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
    </HomeContainer>
  );
};

export default Home;