import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 3px solid transparent;
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`;

const InnerSpinner = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid transparent;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
`;

const LoadingText = styled(motion.p)`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  font-weight: 500;
`;

const Dots = styled(motion.span)`
  display: inline-block;
`;

const LoadingSpinner = () => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const innerSpinnerVariants = {
    animate: {
      rotate: -360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const dotsVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatType: 'loop'
      }
    }
  };

  const dotVariants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <LoadingContainer>
      <SpinnerContainer>
        <Spinner variants={spinnerVariants} animate="animate" />
        <InnerSpinner variants={innerSpinnerVariants} animate="animate" />
      </SpinnerContainer>
      
      <LoadingText
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Loading amazing content
        <Dots variants={dotsVariants} animate="animate">
          <motion.span variants={dotVariants}>.</motion.span>
          <motion.span variants={dotVariants}>.</motion.span>
          <motion.span variants={dotVariants}>.</motion.span>
        </Dots>
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;