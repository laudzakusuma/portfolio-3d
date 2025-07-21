import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const TerminalContainer = styled(motion.div)`
  position: fixed;
  bottom: 60px;
  left: 20px;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid #00ff00;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #00ff00;
  padding: 15px;
  z-index: 998;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 80px;
    left: 10px;
    right: 10px;
    max-width: none;
    font-size: 12px;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
`;

const TerminalButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const TerminalLine = styled(motion.div)`
  margin: 4px 0;
  display: flex;
  align-items: center;
`;

const Prompt = styled.span`
  color: #00d4ff;
  margin-right: 8px;
`;

const Command = styled.span`
  color: #fff;
`;

const Output = styled.span`
  color: #00ff88;
`;

const Error = styled.span`
  color: #ff4757;
`;

const Cursor = styled.span`
  background: #00ff00;
  color: transparent;
  animation: ${blink} 1s infinite;
  margin-left: 2px;
`;

const TerminalCursor = () => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const commands = [
    { 
      command: 'npm run dev', 
      output: '> Starting development server...',
      type: 'output'
    },
    { 
      command: 'git status', 
      output: 'On branch main\nYour branch is up to date',
      type: 'output'
    },
    { 
      command: 'solc --version', 
      output: 'solc, the solidity compiler commandline interface\nVersion: 0.8.19',
      type: 'output'
    },
    { 
      command: 'hardhat compile', 
      output: 'Compiling contracts...\n✅ Compilation finished successfully',
      type: 'output'
    },
    { 
      command: 'npm test', 
      output: 'Running tests...\n✅ All tests passed',
      type: 'output'
    },
    { 
      command: 'curl -X GET https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', 
      output: '{"ethereum":{"usd":2580.75}}',
      type: 'output'
    },
    { 
      command: 'web3 --version', 
      output: 'Web3.py v6.2.0',
      type: 'output'
    },
    { 
      command: 'npx create-react-app defi-dashboard', 
      output: 'Creating a new React app in /defi-dashboard...',
      type: 'output'
    }
  ];

  useEffect(() => {
    let commandIndex = 0;
    let charIndex = 0;
    let isTyping = false;

    const typeCommand = () => {
      if (commandIndex >= commands.length) {
        commandIndex = 0;
      }

      const currentCommand = commands[commandIndex];
      
      if (!isTyping) {
        isTyping = true;
        charIndex = 0;
        setCurrentLine('');
      }

      if (charIndex < currentCommand.command.length) {
        setCurrentLine(currentCommand.command.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeCommand, Math.random() * 100 + 50);
      } else {
        setTimeout(() => {
          setLines(prev => [
            ...prev.slice(-4),
            { 
              command: currentCommand.command, 
              output: currentCommand.output,
              type: currentCommand.type 
            }
          ]);
          setCurrentLine('');
          isTyping = false;
          commandIndex++;
          setTimeout(typeCommand, 2000);
        }, 1000);
      }
    };

    const timer = setTimeout(typeCommand, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <AnimatePresence>
      <TerminalContainer
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          height: isMinimized ? 'auto' : 'auto'
        }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <TerminalHeader>
          <TerminalButton color="#ff5f56" onClick={toggleMinimize} style={{ cursor: 'pointer' }} />
          <TerminalButton color="#ffbd2e" />
          <TerminalButton color="#27ca3f" />
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#666' }}>
            vibe-coder@web3-dev: ~
          </span>
        </TerminalHeader>

        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TerminalLine>
                  <Prompt>$</Prompt>
                  <Command>{line.command}</Command>
                </TerminalLine>
                {line.output.split('\n').map((outputLine, i) => (
                  <TerminalLine key={i}>
                    {line.type === 'error' ? (
                      <Error>{outputLine}</Error>
                    ) : (
                      <Output>{outputLine}</Output>
                    )}
                  </TerminalLine>
                ))}
              </motion.div>
            ))}

            <TerminalLine>
              <Prompt>$</Prompt>
              <Command>{currentLine}</Command>
              <Cursor>_</Cursor>
            </TerminalLine>
          </motion.div>
        )}
      </TerminalContainer>
    </AnimatePresence>
  );
};

export default TerminalCursor;