import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 3rem;
  text-align: center;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FilterButtons = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  background: ${({ active, theme }) => 
    active 
      ? `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})` 
      : 'transparent'
  };
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ active, theme }) => active ? '#fff' : theme.colors.primary};
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    color: #fff;
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s ease;
  }

  &:hover:after {
    opacity: 0;
  }
`;

const ProjectContent = styled.div`
  padding: 20px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 15px;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const TechTag = styled.span`
  background: rgba(0, 212, 255, 0.2);
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 212, 255, 0.3);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const ProjectLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
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

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  backdrop-filter: blur(10px);
`;

const OverlayContent = styled.div`
  text-align: center;
  color: white;
`;

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web Development', '3D/Animation', 'Mobile App'];

  const projects = [
    {
      id: 1,
      title: "3D Portfolio Website",
      description: "Interactive portfolio website with Three.js animations and responsive design.",
      category: "Web Development",
      tech: ["React", "Three.js", "Framer Motion", "Styled Components"],
      github: "#",
      demo: "#"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      category: "Web Development",
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      demo: "#"
    },
    {
      id: 3,
      title: "3D Product Visualizer",
      description: "Interactive 3D product showcase with customization options and AR preview.",
      category: "3D/Animation",
      tech: ["Three.js", "WebXR", "Blender", "React"],
      github: "#",
      demo: "#"
    },
    {
      id: 4,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication.",
      category: "Mobile App",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      github: "#",
      demo: "#"
    },
    {
      id: 5,
      title: "Particle Animation System",
      description: "Advanced particle system with physics simulation and interactive controls.",
      category: "3D/Animation",
      tech: ["WebGL", "GLSL", "JavaScript", "Canvas API"],
      github: "#",
      demo: "#"
    },
    {
      id: 6,
      title: "Real-time Chat App",
      description: "Real-time messaging application with video calls and file sharing.",
      category: "Web Development",
      tech: ["Socket.io", "Express", "React", "WebRTC"],
      github: "#",
      demo: "#"
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <ProjectsContainer>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>Featured Projects</SectionTitle>
        </motion.div>

        <FilterButtons
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="hoverable"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterButtons>

        <AnimatePresence mode="wait">
          <ProjectGrid
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="hoverable"
                layout
              >
                <ProjectImage>
                  <ProjectOverlay
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OverlayContent>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                          {project.title}
                        </h4>
                        <p>Click to view details</p>
                      </motion.div>
                    </OverlayContent>
                  </ProjectOverlay>
                </ProjectImage>
                
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  
                  <TechStack>
                    {project.tech.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </TechStack>
                  
                  <ProjectLinks>
                    <ProjectLink
                      href={project.github}
                      className="hoverable"
                      whileHover={{ scale: 1.1 }}
                    >
                      GitHub
                    </ProjectLink>
                    <ProjectLink
                      href={project.demo}
                      className="hoverable"
                      whileHover={{ scale: 1.1 }}
                    >
                      Live Demo
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectGrid>
        </AnimatePresence>
      </Container>
    </ProjectsContainer>
  );
};

export default Projects;