import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ConnectContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 15px;
    right: 15px;
  }
`;

const ConnectButton = styled(motion.button)`
  background: ${({ connected }) => 
    connected 
      ? 'linear-gradient(45deg, #00ff88, #00d4ff)' 
      : 'linear-gradient(45deg, #ff6b35, #ff0080)'
  };
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
`;

const WalletIcon = styled.span`
  font-size: 1.1rem;
`;

const Address = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 0.8rem;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background: rgba(26, 26, 46, 0.95);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 15px;
  min-width: 200px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const WalletOption = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: rgba(0, 212, 255, 0.1);
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const Balance = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Network = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`;

const Web3Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState('0.0');

  const connectWallet = async () => {
    if (!isConnected) {
      try {
        const mockAddress = '0x1234...5678';
        const mockBalance = '2.45';
        
        setWalletAddress(mockAddress);
        setBalance(mockBalance);
        setIsConnected(true);
        setShowDropdown(false);
        
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance('0.0');
    setShowDropdown(false);
  };

  const walletOptions = [
    { name: 'MetaMask', icon: '🦊', installed: true },
    { name: 'WalletConnect', icon: '🌐', installed: true },
    { name: 'Coinbase Wallet', icon: '🔵', installed: false },
    { name: 'Trust Wallet', icon: '🛡️', installed: false }
  ];

  return (
    <ConnectContainer>
      <ConnectButton
        connected={isConnected}
        onClick={connectWallet}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hoverable"
      >
        <WalletIcon>
          {isConnected ? '🟢' : '🔗'}
        </WalletIcon>
        {isConnected ? (
          <Address>{walletAddress}</Address>
        ) : (
          'Connect Wallet'
        )}
      </ConnectButton>

      <AnimatePresence>
        {showDropdown && isConnected && (
          <Dropdown
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <WalletInfo>
              <div>
                <strong>Balance:</strong> <Balance>{balance} ETH</Balance>
              </div>
              <div>
                <strong>Network:</strong> <Network>Ethereum Mainnet</Network>
              </div>
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <motion.button
                  style={{
                    background: 'rgba(255, 107, 53, 0.2)',
                    border: '1px solid #ff6b35',
                    color: '#ff6b35',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                  onClick={disconnectWallet}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Disconnect
                </motion.button>
              </div>
            </WalletInfo>
          </Dropdown>
        )}

        {showDropdown && !isConnected && (
          <Dropdown
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {walletOptions.map((wallet) => (
              <WalletOption
                key={wallet.name}
                onClick={() => {
                  if (wallet.installed) {
                    connectWallet();
                  }
                }}
                whileHover={{ x: 5 }}
                style={{ 
                  opacity: wallet.installed ? 1 : 0.5,
                  cursor: wallet.installed ? 'pointer' : 'not-allowed'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{wallet.icon}</span>
                <div>
                  <div>{wallet.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888' }}>
                    {wallet.installed ? 'Installed' : 'Not Available'}
                  </div>
                </div>
              </WalletOption>
            ))}
          </Dropdown>
        )}
      </AnimatePresence>
    </ConnectContainer>
  );
};

export default Web3Connect;