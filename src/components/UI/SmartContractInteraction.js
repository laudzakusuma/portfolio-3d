import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ContractContainer = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid #00ff00;
  border-radius: 12px;
  padding: 20px;
  z-index: 997;
  font-family: 'Courier New', monospace;
  box-shadow: 0 8px 32px rgba(0, 255, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    bottom: 100px;
    right: 10px;
    left: 10px;
    width: auto;
  }
`;

const ContractHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

const ContractTitle = styled.h3`
  color: #00ff00;
  font-size: 1rem;
  margin: 0;
`;

const MinimizeButton = styled.button`
  background: none;
  border: none;
  color: #00ff00;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
  }
`;

const ContractInfo = styled.div`
  margin-bottom: 15px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 0.8rem;
`;

const Label = styled.span`
  color: #ccc;
`;

const Value = styled.span`
  color: #00d4ff;
  font-weight: 600;
`;

const ContractAddress = styled.div`
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 8px;
  border-radius: 6px;
  margin: 10px 0;
  font-size: 0.7rem;
  color: #00d4ff;
  word-break: break-all;
`;

const InteractionSection = styled.div`
  margin: 15px 0;
`;

const SectionTitle = styled.h4`
  color: #fff;
  font-size: 0.9rem;
  margin: 10px 0 8px 0;
  border-bottom: 1px solid #333;
  padding-bottom: 5px;
`;

const FunctionCall = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
`;

const FunctionName = styled.div`
  color: #ff6b35;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 0.85rem;
`;

const FunctionParams = styled.div`
  color: #00ff88;
  font-size: 0.75rem;
  margin-bottom: 8px;
`;

const CallButton = styled(motion.button)`
  background: linear-gradient(45deg, #00d4ff, #00ff88);
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  width: 100%;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TransactionLog = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #333;
  border-radius: 6px;
  padding: 10px;
  max-height: 120px;
  overflow-y: auto;
  font-size: 0.7rem;
`;

const LogEntry = styled(motion.div)`
  margin: 4px 0;
  color: ${({ type }) => {
    switch(type) {
      case 'success': return '#00ff88';
      case 'error': return '#ff4757';
      case 'pending': return '#ffbd2e';
      default: return '#ccc';
    }
  }};
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 15px;
  right: 50px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ status }) => {
    switch(status) {
      case 'connected': return '#00ff88';
      case 'pending': return '#ffbd2e';
      case 'error': return '#ff4757';
      default: return '#666';
    }
  }};
  box-shadow: 0 0 10px ${({ status }) => {
    switch(status) {
      case 'connected': return '#00ff88';
      case 'pending': return '#ffbd2e';
      case 'error': return '#ff4757';
      default: return '#666';
    }
  }};
`;

const SmartContractInteraction = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [contractStatus, setContractStatus] = useState('disconnected');
  const [transactionLogs, setTransactionLogs] = useState([]);
  const [totalSupply, setTotalSupply] = useState('1,000,000');
  const [userBalance, setUserBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const contractAddress = '0x742d35Cc6634C0532925a3b8D8Cc6d5d8b5c4Ac4';

  useEffect(() => {
    const connectToContract = () => {
      setContractStatus('pending');
      addLog('Connecting to smart contract...', 'pending');
      
      setTimeout(() => {
        setContractStatus('connected');
        addLog('Successfully connected to ERC-20 contract', 'success');
        addLog(`Contract Address: ${contractAddress}`, 'info');
      }, 2000);
    };

    connectToContract();
  }, []);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setTransactionLogs(prev => [...prev.slice(-4), { 
      message, 
      type, 
      timestamp,
      id: Date.now() 
    }]);
  };

  const callFunction = async (functionName, params = {}) => {
    if (contractStatus !== 'connected') {
      addLog('Contract not connected', 'error');
      return;
    }

    setIsLoading(true);
    addLog(`Calling ${functionName}()...`, 'pending');

    setTimeout(() => {
      switch (functionName) {
        case 'balanceOf':
          const newBalance = (Math.random() * 1000).toFixed(2);
          setUserBalance(newBalance);
          addLog(`Balance updated: ${newBalance} tokens`, 'success');
          break;
          
        case 'transfer':
          addLog(`Transfer of ${params.amount} tokens initiated`, 'success');
          addLog(`Transaction hash: 0x${Math.random().toString(16).substr(2, 10)}...`, 'info');
          setUserBalance(prev => (parseFloat(prev) - parseFloat(params.amount || 0)).toFixed(2));
          break;
          
        case 'mint':
          const mintAmount = params.amount || '100';
          addLog(`Minted ${mintAmount} new tokens`, 'success');
          setTotalSupply(prev => (parseFloat(prev.replace(/,/g, '')) + parseFloat(mintAmount)).toLocaleString());
          setUserBalance(prev => (parseFloat(prev) + parseFloat(mintAmount)).toFixed(2));
          break;
          
        case 'approve':
          addLog(`Approval for ${params.spender} granted`, 'success');
          addLog(`Allowance: ${params.amount} tokens`, 'info');
          break;
          
        default:
          addLog(`${functionName} executed successfully`, 'success');
      }
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const contractFunctions = [
    {
      name: 'balanceOf',
      params: 'address owner',
      description: 'Get token balance'
    },
    {
      name: 'transfer', 
      params: 'address to, uint256 amount',
      description: 'Transfer tokens'
    },
    {
      name: 'mint',
      params: 'address to, uint256 amount', 
      description: 'Mint new tokens'
    },
    {
      name: 'approve',
      params: 'address spender, uint256 amount',
      description: 'Approve spending'
    }
  ];

  return (
    <AnimatePresence>
      <ContractContainer
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <ContractHeader>
          <ContractTitle>Smart Contract</ContractTitle>
          <StatusIndicator status={contractStatus} />
          <MinimizeButton 
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '+' : '−'}
          </MinimizeButton>
        </ContractHeader>

        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <ContractInfo>
              <InfoRow>
                <Label>Network:</Label>
                <Value>Ethereum Mainnet</Value>
              </InfoRow>
              <InfoRow>
                <Label>Token:</Label>
                <Value>MyToken (MTK)</Value>
              </InfoRow>
              <InfoRow>
                <Label>Total Supply:</Label>
                <Value>{totalSupply} MTK</Value>
              </InfoRow>
              <InfoRow>
                <Label>Your Balance:</Label>
                <Value>{userBalance} MTK</Value>
              </InfoRow>
            </ContractInfo>

            <ContractAddress>
              {contractAddress}
            </ContractAddress>

            <InteractionSection>
              <SectionTitle>Contract Functions</SectionTitle>
              {contractFunctions.map((func, index) => (
                <FunctionCall
                  key={func.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FunctionName>{func.name}()</FunctionName>
                  <FunctionParams>{func.params}</FunctionParams>
                  <CallButton
                    onClick={() => callFunction(func.name, { 
                      amount: '100', 
                      spender: '0x742d35Cc...', 
                      to: '0x742d35Cc...' 
                    })}
                    disabled={isLoading || contractStatus !== 'connected'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? 'Executing...' : 'Call Function'}
                  </CallButton>
                </FunctionCall>
              ))}
            </InteractionSection>

            <InteractionSection>
              <SectionTitle>Transaction Log</SectionTitle>
              <TransactionLog>
                {transactionLogs.map((log) => (
                  <LogEntry
                    key={log.id}
                    type={log.type}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    [{log.timestamp}] {log.message}
                  </LogEntry>
                ))}
              </TransactionLog>
            </InteractionSection>
          </motion.div>
        )}
      </ContractContainer>
    </AnimatePresence>
  );
};

export default SmartContractInteraction;