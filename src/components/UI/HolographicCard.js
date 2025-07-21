import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CardContainer = styled(motion.div)`
  perspective: 1000px;
  cursor: pointer;
`;

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 15px;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.1) 0%,
    rgba(255, 107, 53, 0.1) 50%,
    rgba(0, 212, 255, 0.1) 100%
  );
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(20px);
  overflow: hidden;
  transform-style: preserve-3d;
`;

const HologramEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(0, 255, 255, 0.1) 50%,
    transparent 70%
  );
  pointer-events: none;
  mix-blend-mode: screen;
`;

const ScanLine = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    #00ffff,
    transparent
  );
  pointer-events: none;
`;

const DataStream = styled(motion.div)`
  position: absolute;
  right: 10px;
  top: 10px;
  font-family: 'Courier New', monospace;
  font-size: 8px;
  color: #00ff00;
  opacity: 0.7;
  line-height: 1.2;
`;

const CardContent = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const ProjectTitle = styled(motion.h3)`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
`;

const ProjectDescription = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 15px;
  line-height: 1.6;
  flex-grow: 1;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 8px;
  margin-bottom: 15px;
`;

const TechChip = styled(motion.div)`
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.4);
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.7rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'Courier New', monospace;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const ProjectLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const CornerAccent = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #00ffff;
  
  &.top-left {
    top: 10px;
    left: 10px;
    border-right: none;
    border-bottom: none;
  }
  
  &.top-right {
    top: 10px;
    right: 10px;
    border-left: none;
    border-bottom: none;
  }
  
  &.bottom-left {
    bottom: 10px;
    left: 10px;
    border-right: none;
    border-top: none;
  }
  
  &.bottom-right {
    bottom: 10px;
    right: 10px;
    border-left: none;
    border-top: none;
  }
`;

const HolographicCard = ({ project, index, isHovered, onHover, onLeave }) => {
  const cardRef = useRef(null);
  const [localHover, setLocalHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseEnter = () => {
    setLocalHover(true);
    onHover?.(index);
  };

  const handleMouseLeave = () => {
    setLocalHover(false);
    x.set(0);
    y.set(0);
    onLeave?.();
  };

  const binaryData = [
    '01001000 01101001',
    '01000100 01100101 01000110 01101001',
    '01010111 01100101 01100010 00110011',
    '01000010 01101100 01101111 01100011',
    '01001110 01000110 01010100 00100000',
    '01000101 01110100 01101000 01100101'
  ];

  return (
    <CardContainer>
      <Card
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 25px 50px rgba(0, 212, 255, 0.4)',
        }}
        animate={{
          borderColor: localHover 
            ? ['rgba(0, 212, 255, 0.6)', 'rgba(255, 107, 53, 0.6)', 'rgba(0, 212, 255, 0.6)']
            : 'rgba(0, 212, 255, 0.3)',
        }}
        transition={{
          borderColor: { duration: 2, repeat: Infinity },
          scale: { type: 'spring', stiffness: 300, damping: 30 },
        }}
      >
        {/* Corner Accents */}
        <CornerAccent 
          className="top-left"
          animate={{
            opacity: localHover ? 1 : 0.5,
            scale: localHover ? 1.2 : 1,
          }}
        />
        <CornerAccent 
          className="top-right"
          animate={{
            opacity: localHover ? 1 : 0.5,
            scale: localHover ? 1.2 : 1,
          }}
        />
        <CornerAccent 
          className="bottom-left"
          animate={{
            opacity: localHover ? 1 : 0.5,
            scale: localHover ? 1.2 : 1,
          }}
        />
        <CornerAccent 
          className="bottom-right"
          animate={{
            opacity: localHover ? 1 : 0.5,
            scale: localHover ? 1.2 : 1,
          }}
        />

        {/* Hologram Effect */}
        <HologramEffect
          animate={{
            background: localHover
              ? [
                  'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.2) 50%, transparent 70%)',
                  'linear-gradient(135deg, transparent 30%, rgba(255, 0, 255, 0.2) 50%, transparent 70%)',
                  'linear-gradient(225deg, transparent 30%, rgba(0, 255, 0, 0.2) 50%, transparent 70%)',
                  'linear-gradient(315deg, transparent 30%, rgba(0, 255, 255, 0.2) 50%, transparent 70%)',
                ]
              : 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%)',
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Scanning Line */}
        <ScanLine
          animate={{
            y: localHover ? [0, 300, 0] : [0, 300],
            opacity: localHover ? [0, 1, 0] : [0, 0.5],
          }}
          transition={{
            duration: localHover ? 2 : 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Data Stream */}
        <DataStream
          animate={{
            opacity: localHover ? [0.3, 0.8, 0.3] : 0.4,
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {binaryData.map((line, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {line}
            </motion.div>
          ))}
        </DataStream>

        {/* Card Content */}
        <CardContent>
          <div>
            <ProjectTitle
              animate={{
                textShadow: localHover 
                  ? '0 0 20px rgba(0, 212, 255, 0.8)'
                  : '0 0 10px rgba(0, 212, 255, 0.5)',
              }}
            >
              {project.title}
            </ProjectTitle>
            
            <ProjectDescription>
              {project.description}
            </ProjectDescription>
          </div>

          <div>
            <TechGrid>
              {project.tech.map((tech, techIndex) => (
                <TechChip
                  key={tech}
                  animate={{
                    scale: localHover ? [1, 1.05, 1] : 1,
                    borderColor: localHover 
                      ? 'rgba(0, 212, 255, 0.8)' 
                      : 'rgba(0, 212, 255, 0.4)',
                  }}
                  transition={{
                    scale: { 
                      duration: 0.5, 
                      repeat: Infinity, 
                      delay: techIndex * 0.1 
                    },
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    background: 'rgba(0, 212, 255, 0.3)',
                  }}
                >
                  {tech}
                </TechChip>
              ))}
            </TechGrid>
            
            <ProjectLinks>
              <ProjectLink
                href={project.github}
                whileHover={{ 
                  scale: 1.1,
                  color: '#00ffff',
                  textShadow: '0 0 10px #00ffff',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {'<'} GitHub {'>'}
              </ProjectLink>
              <ProjectLink
                href={project.demo}
                whileHover={{ 
                  scale: 1.1,
                  color: '#00ff88',
                  textShadow: '0 0 10px #00ff88',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {'<'} Live Demo {'>'}
              </ProjectLink>
            </ProjectLinks>
          </div>
        </CardContent>

        {/* Additional glitch effects */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
            pointerEvents: 'none',
          }}
          animate={{
            opacity: localHover ? [0.1, 0.3, 0.1] : 0.1,
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      </Card>
    </CardContainer>
  );
};

export default HolographicCard;