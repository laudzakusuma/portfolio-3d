import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text, delay = 0 }) => {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{
            display: 'inline-block',
            transformOrigin: '50% 50%',
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;