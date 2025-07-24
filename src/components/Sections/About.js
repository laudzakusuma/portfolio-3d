import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.section`
  min-height: 100vh;
  padding: 100px 50px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TextContent = styled(motion.div)`
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 2rem;
  background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const SkillsContainer = styled(motion.div)`
  margin-top: 3rem;
`;

const SkillsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const CategoryTitle = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 15px;
  font-size: 1.1rem;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillTag = styled(motion.span)`
  background: rgba(0, 212, 255, 0.2);
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 212, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 212, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const VisualContent = styled(motion.div)`
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  background: rgba(26, 26, 46, 0.8);
  padding: 20px;
  border-radius: 15px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  backdrop-filter: blur(10px);
  min-width: 120px;
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const CardTitle = styled.h5`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const CardValue = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;
`;

const About = () => {
  const skills = {
    "Blockchain": ["Solidity", "Ethereum", "Web3.js", "Ethers.js", "Hardhat"],
    "Frontend": ["React", "Next.js", "TypeScript", "Web3 UI/UX", "MetaMask Integration"],
    "Backend & APIs": ["Node.js", "Express"],
    "DeFi & NFTs": ["OpenZeppelin", "Uniswap", "OpenSea API", "ERC-20"]
  };

  const stats = [
    { icon: "⛓️", title: "Smart Contracts", value: "25+" },
    { icon: "🚀", title: "DApps Built", value: "10+" },
    { icon: "💎", title: "Years in Crypto", value: "2+" },
    { icon: "🌍", title: "Blockchains", value: "5+" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AboutContainer>
      <Container>
        <ContentGrid>
          <TextContent
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <SectionTitle variants={itemVariants}>
              About Me
            </SectionTitle>
            
            <Description variants={itemVariants}>
              I'm a passionate Vibe Coder and Web3 enthusiast who lives and breathes 
              decentralized technology. From smart contracts to DeFi protocols, I'm constantly 
              exploring the bleeding edge of what's possible in the crypto space.
            </Description>
            
            <Description variants={itemVariants}>
              My journey into Web3 started 2 years ago when I fell down the Bitcoin rabbit hole. 
              Since then, I've been building on Ethereum, experimenting with Layer 2 solutions, 
              and contributing to the open-source ecosystem that's reshaping the internet.
            </Description>

            <SkillsContainer variants={itemVariants}>
              <SkillsTitle>Technical Skills</SkillsTitle>
              <SkillsGrid>
                {Object.entries(skills).map(([category, skillList]) => (
                  <SkillCategory
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    className="hoverable"
                  >
                    <CategoryTitle>{category}</CategoryTitle>
                    <SkillsList>
                      {skillList.map((skill) => (
                        <SkillTag
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          className="hoverable"
                        >
                          {skill}
                        </SkillTag>
                      ))}
                    </SkillsList>
                  </SkillCategory>
                ))}
              </SkillsGrid>
            </SkillsContainer>
          </TextContent>

          <VisualContent
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <FloatingCard
                key={stat.title}
                variants={floatingVariants}
                animate="animate"
                style={{
                  top: `${20 + (index % 2) * 40}%`,
                  left: `${10 + (index % 3) * 30}%`,
                  animationDelay: `${index * 0.5}s`
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                className="hoverable"
              >
                <CardIcon>{stat.icon}</CardIcon>
                <CardTitle>{stat.title}</CardTitle>
                <CardValue>{stat.value}</CardValue>
              </FloatingCard>
            ))}
            
            <motion.div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            
            <motion.div
              style={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                border: '2px solid rgba(255, 107, 53, 0.3)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
          </VisualContent>
        </ContentGrid>
      </Container>
    </AboutContainer>
  );
};

export default About;