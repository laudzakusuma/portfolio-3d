import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const codeGlow = keyframes`
  0%, 100% { text-shadow: 0 0 5px #00ff00; }
  50% { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
`;

const CodeContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00ff00;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(90deg, #1a1a1a, #2a2a2a);
    border-bottom: 1px solid #333;
  }
`;

const CodeHeader = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CodeButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const FileName = styled.span`
  color: #fff;
  font-size: 12px;
  margin-left: auto;
`;

const CodeContent = styled.div`
  position: relative;
  z-index: 2;
  line-height: 1.6;
`;

const CodeLine = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 2px 0;
`;

const LineNumber = styled.span`
  color: #666;
  margin-right: 15px;
  min-width: 30px;
  text-align: right;
  user-select: none;
`;

const CodeText = styled.span`
  color: ${({ type }) => {
    switch (type) {
      case 'keyword': return '#ff6b35';
      case 'function': return '#00d4ff';
      case 'string': return '#00ff88';
      case 'comment': return '#666';
      case 'number': return '#ff0080';
      case 'variable': return '#fff';
      default: return '#ccc';
    }
  }};
  
  ${({ isAnimating }) => isAnimating && `animation: ${codeGlow} 2s ease-in-out infinite;`}
`;

const Cursor = styled(motion.span)`
  background: #00ff00;
  color: transparent;
  margin-left: 2px;
`;

const CodeBlock = ({ filename, code, language = "solidity", autoType = false }) => {
  const [typedLines, setTypedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(autoType);

  const codeLines = code.split('\n');

  const highlightCode = (line) => {
    const tokens = [];
    const keywords = ['contract', 'function', 'modifier', 'require', 'emit', 'mapping', 'uint256', 'address', 'bool', 'string', 'pragma', 'solidity', 'public', 'private', 'external', 'internal', 'view', 'pure', 'payable'];
    const functions = ['balanceOf', 'transfer', 'approve', 'transferFrom', 'mint', 'burn', 'stake', 'unstake'];
    
    let currentToken = '';
    let inString = false;
    let inComment = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"' || char === "'") {
        if (currentToken) {
          tokens.push({ text: currentToken, type: 'variable' });
          currentToken = '';
        }
        inString = !inString;
        currentToken += char;
      } else if (line.slice(i, i + 2) === '//' && !inString) {
        if (currentToken) {
          tokens.push({ text: currentToken, type: 'variable' });
          currentToken = '';
        }
        inComment = true;
        currentToken += char;
      } else if (char === ' ' || char === '(' || char === ')' || char === '{' || char === '}' || char === ';' || char === ',' || char === '=') {
        if (currentToken) {
          let type = 'variable';
          if (inString || inComment) {
            type = inString ? 'string' : 'comment';
          } else if (keywords.includes(currentToken)) {
            type = 'keyword';
          } else if (functions.includes(currentToken)) {
            type = 'function';
          } else if (!isNaN(currentToken)) {
            type = 'number';
          }
          
          tokens.push({ text: currentToken, type });
          currentToken = '';
        }
        if (char !== ' ') {
          tokens.push({ text: char, type: 'variable' });
        } else {
          tokens.push({ text: ' ', type: 'variable' });
        }
      } else {
        currentToken += char;
      }
    }
    
    if (currentToken) {
      let type = 'variable';
      if (inString || inComment) {
        type = inString ? 'string' : 'comment';
      } else if (keywords.includes(currentToken)) {
        type = 'keyword';
      } else if (functions.includes(currentToken)) {
        type = 'function';
      } else if (!isNaN(currentToken)) {
        type = 'number';
      }
      tokens.push({ text: currentToken, type });
    }

    return tokens;
  };

  useEffect(() => {
    if (!isTyping) {
      setTypedLines(codeLines.map(line => highlightCode(line)));
      return;
    }

    const typeCode = () => {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        if (currentChar <= line.length) {
          const partialLine = line.slice(0, currentChar);
          const newTypedLines = [...typedLines];
          newTypedLines[currentLine] = highlightCode(partialLine);
          setTypedLines(newTypedLines);
          setCurrentChar(currentChar + 1);
        } else {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      } else {
        setIsTyping(false);
      }
    };

    const timer = setTimeout(typeCode, Math.random() * 50 + 30);
    return () => clearTimeout(timer);
  }, [currentLine, currentChar, isTyping]);

  return (
    <CodeContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <CodeHeader>
        <CodeButton color="#ff5f56" />
        <CodeButton color="#ffbd2e" />
        <CodeButton color="#27ca3f" />
        <FileName>{filename}</FileName>
      </CodeHeader>

      <CodeContent>
        {typedLines.map((tokens, lineIndex) => (
          <CodeLine
            key={lineIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: lineIndex * 0.1 }}
          >
            <LineNumber>{lineIndex + 1}</LineNumber>
            <div>
              {tokens?.map((token, tokenIndex) => (
                <CodeText
                  key={`${lineIndex}-${tokenIndex}`}
                  type={token.type}
                  isAnimating={token.type === 'keyword'}
                >
                  {token.text}
                </CodeText>
              ))}
              {isTyping && lineIndex === currentLine && (
                <Cursor
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  _
                </Cursor>
              )}
            </div>
          </CodeLine>
        ))}
      </CodeContent>
    </CodeContainer>
  );
};

export default CodeBlock;