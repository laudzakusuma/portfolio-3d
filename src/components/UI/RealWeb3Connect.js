import React, { useState, useEffect } from 'react';
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
  padding: 12px 24px;
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
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const WalletIcon = styled.span`
  font-size: 1.2rem;
`;

const Address = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 0.8rem;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background: rgba(26, 26, 46, 0.95);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  min-width: 280px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 600;
`;

const NetworkBadge = styled.div`
  background: ${({ network }) => {
    switch(network) {
      case 'ethereum': return 'linear-gradient(45deg, #627eea, #8a92b2)';
      case 'polygon': return 'linear-gradient(45deg, #8247e5, #c44df7)';
      case 'bsc': return 'linear-gradient(45deg, #f3ba2f, #fcd535)';
      default: return 'linear-gradient(45deg, #333, #555)';
    }
  }};
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const ActionButton = styled(motion.button)`
  background: ${({ variant }) => 
    variant === 'danger' 
      ? 'rgba(255, 107, 53, 0.2)' 
      : 'rgba(0, 212, 255, 0.2)'
  };
  border: 1px solid ${({ variant }) => 
    variant === 'danger' ? '#ff6b35' : '#00d4ff'
  };
  color: ${({ variant }) => 
    variant === 'danger' ? '#ff6b35' : '#00d4ff'
  };
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: ${({ variant }) => 
      variant === 'danger' 
        ? 'rgba(255, 107, 53, 0.3)' 
        : 'rgba(0, 212, 255, 0.3)'
    };
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 107, 53, 0.1);
  border: 1px solid #ff6b35;
  color: #ff6b35;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.8rem;
  margin-top: 10px;
`;

const RealWeb3Connect = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  const getNetworkName = (chainId) => {
    const networks = {
      '0x1': 'ethereum',
      '0x89': 'polygon', 
      '0x38': 'bsc',
      '0xa': 'optimism',
      '0xa4b1': 'arbitrum'
    };
    return networks[chainId] || 'unknown';
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance) => {
    return parseFloat(balance).toFixed(4);
  };

  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask not installed. Please install MetaMask extension.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest'],
        });
        
        const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
        setBalance(balanceInEth.toString());

        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        setChainId(chainId);
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setError(error.message || 'Failed to connect to MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setChainId(null);
    setShowDropdown(false);
    setError(null);
  };

  const switchNetwork = async (targetChainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      });
    } catch (error) {
      setError(`Failed to switch network: ${error.message}`);
    }
  };

  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
          connectWallet();
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(chainId);
        if (account) {
          connectWallet();
        }
      });
    }

    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, [account]);

  const handleButtonClick = () => {
    if (!account) {
      connectWallet();
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  return (
    <ConnectContainer>
      <ConnectButton
        connected={!!account}
        onClick={handleButtonClick}
        disabled={isConnecting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hoverable"
      >
        <WalletIcon>
          {isConnecting ? '⏳' : account ? '🟢' : '🔗'}
        </WalletIcon>
        {isConnecting ? (
          'Connecting...'
        ) : account ? (
          <Address>{formatAddress(account)}</Address>
        ) : (
          'Connect Wallet'
        )}
      </ConnectButton>

      <AnimatePresence>
        {showDropdown && account && (
          <Dropdown
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <WalletInfo>
              <InfoRow>
                <Label>Address:</Label>
                <Value>{formatAddress(account)}</Value>
              </InfoRow>
              
              <InfoRow>
                <Label>Balance:</Label>
                <Value>{balance ? `${formatBalance(balance)} ETH` : 'Loading...'}</Value>
              </InfoRow>
              
              <InfoRow>
                <Label>Network:</Label>
                <NetworkBadge network={getNetworkName(chainId)}>
                  {getNetworkName(chainId)}
                </NetworkBadge>
              </InfoRow>

              {chainId !== '0x1' && (
                <ActionButton
                  onClick={() => switchNetwork('0x1')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Switch to Ethereum Mainnet
                </ActionButton>
              )}

              <ActionButton
                variant="danger"
                onClick={disconnectWallet}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Disconnect Wallet
              </ActionButton>
            </WalletInfo>

            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
          </Dropdown>
        )}

        {!isMetaMaskInstalled() && showDropdown && (
          <Dropdown
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <WalletInfo>
              <ErrorMessage>
                MetaMask not detected. Please install MetaMask extension to connect your wallet.
              </ErrorMessage>
              <ActionButton
                onClick={() => window.open('https://metamask.io/', '_blank')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Install MetaMask
              </ActionButton>
            </WalletInfo>
          </Dropdown>
        )}
      </AnimatePresence>
    </ConnectContainer>
  );
};

export default RealWeb3Connect;