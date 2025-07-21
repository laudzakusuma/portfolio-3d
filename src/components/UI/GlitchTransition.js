import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const glitch1 = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const glitch2 = keyframes`
  0% { transform: translate(0); }
  10% { transform: translate(-1px, -1px); }
  20% { transform: translate(-2px, 0px); }
  30% { transform: translate(1px, 2px); }
  40% { transform: translate(1px, -1px); }
  50% { transform: translate(-1px, 2px); }
  60% { transform: translate(-2px, 1px); }
  70% { transform: translate(2px, 1px); }
  80% { transform: translate(-1px, -1px); }
  90% { transform: translate(1px, 2px); }
  100% { transform: translate(0); }
`;

const scanlines = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 100vh; }
`;

const TransitionOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  pointer-events: none;
`;

const GlitchLayer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 0, 0, 0.03) 50%,
    transparent 100%
  ),
  linear-gradient(
    0deg,
    transparent 0%,
    rgba(0, 255, 0, 0.03) 50%,
    transparent 100%
  ),
  linear-gradient(
    45deg,
    transparent 0%,
    rgba(0, 0, 255, 0.03) 50%,
    transparent 100%
  );
  mix-blend-mode: screen;
`;

const DigitalNoise = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 0, 0.1) 2px,
    rgba(0, 255, 0, 0.1) 4px
  );
  animation: ${scanlines} 0.1s linear infinite;
`;

const BinaryRain = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #00ff00;
  opacity: 0.7;
`;

const BinaryColumn = styled(motion.div)`
  position: absolute;
  white-space: nowrap;
  animation: ${glitch1} 0.1s infinite;
  
  &:nth-child(even) {
    animation: ${glitch2} 0.15s infinite;
  }
`;

const StatusText = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
  text-align: center;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 4px;
  background: rgba(0, 255, 0, 0.2);
  border: 1px solid #00ff00;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 250px;
  }
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #00ff00, #00d4ff);
  box-shadow: 0 0 10px #00ff00;
`;

const GlitchTransition = ({ isActive, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING...');
  const [binaryColumns, setBinaryColumns] = useState([]);

  const statusMessages = [
    'INITIALIZING...',
    'CONNECTING TO BLOCKCHAIN...',
    'LOADING SMART CONTRACTS...',
    'SYNCING WEB3 PROVIDER...',
    'DECRYPTING PROTOCOLS...',
    'ACCESSING METAVERSE...',
    'READY'
  ];

  useEffect(() => {
    if (!isActive) return;

    const columns = [];
    for (let i = 0; i < 50; i++) {
      const binaryString = Array.from({ length: 20 }, () => 
        Math.random() > 0.5 ? '1' : '0'
      ).join('');
      
      columns.push({
        id: i,
        text: binaryString,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`
      });
    }
    setBinaryColumns(columns);

    let currentProgress = 0;
    let messageIndex = 0;

    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setTimeout(onComplete, 500);
      }

      setProgress(currentProgress);

      const newMessageIndex = Math.floor((currentProgress / 100) * statusMessages.length);
      if (newMessageIndex !== messageIndex && newMessageIndex < statusMessages.length) {
        messageIndex = newMessageIndex;
        setStatusText(statusMessages[messageIndex]);
      }
    }, 200);

    return () => clearInterval(progressInterval);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <TransitionOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, #000000, #001122, #000000)',
          }}
          animate={{
            background: [
              'linear-gradient(45deg, #000000, #001122, #000000)',
              'linear-gradient(45deg, #001100, #000022, #001100)',
              'linear-gradient(45deg, #000000, #001122, #000000)',
            ],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        {/* Binary Rain */}
        <BinaryRain>
          {binaryColumns.map((column) => (
            <BinaryColumn
              key={column.id}
              style={{
                left: column.left,
                animationDelay: column.animationDelay,
              }}
              animate={{
                y: ['-100vh', '100vh'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 2,
              }}
            >
              {column.text}
            </BinaryColumn>
          ))}
        </BinaryRain>

        {/* Glitch Layers */}
        <GlitchLayer
          animate={{
            x: [0, -2, 2, 0],
            opacity: [0.5, 0.8, 0.3, 0.6],
          }}
          transition={{ duration: 0.1, repeat: Infinity }}
        />

        {/* Digital Noise */}
        <DigitalNoise />

        {/* Status Text */}
        <StatusText
          animate={{
            scale: [1, 1.02, 1],
            textShadow: [
              '0 0 10px #00ff00',
              '0 0 20px #00ff00, 0 0 30px #00ff00',
              '0 0 10px #00ff00',
            ],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {statusText}
        </StatusText>

        {/* Progress Bar */}
        <ProgressBar>
          <ProgressFill
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </ProgressBar>

        {/* Additional glitch effect on edges */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '2px solid #00ff00',
            pointerEvents: 'none',
          }}
          animate={{
            borderColor: ['#00ff00', '#ff0000', '#0000ff', '#00ff00'],
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      </TransitionOverlay>
    </AnimatePresence>
  );
};

export default GlitchTransition;