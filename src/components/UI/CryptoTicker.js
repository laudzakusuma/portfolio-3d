import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TickerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: rgba(0, 0, 0, 0.9);
  border-top: 1px solid rgba(0, 212, 255, 0.3);
  z-index: 100;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const TickerTrack = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 40px;
  white-space: nowrap;
`;

const TickerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 0.9rem;
`;

const CoinSymbol = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Price = styled.span`
  color: ${({ change }) => change >= 0 ? '#00ff88' : '#ff4757'};
`;

const Change = styled.span`
  color: ${({ change }) => change >= 0 ? '#00ff88' : '#ff4757'};
  font-size: 0.8rem;
`;

const CryptoTicker = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const mockData = [
      { symbol: 'BTC', price: 43250.50, change: 2.45 },
      { symbol: 'ETH', price: 2580.75, change: -1.23 },
      { symbol: 'BNB', price: 315.20, change: 0.85 },
      { symbol: 'ADA', price: 0.48, change: 3.21 },
      { symbol: 'MATIC', price: 0.82, change: -0.67 },
      { symbol: 'LINK', price: 14.56, change: 1.89 },
      { symbol: 'UNI', price: 6.23, change: -2.11 },
      { symbol: 'AAVE', price: 95.40, change: 4.56 }
    ];

    setCryptoData(mockData);

    const interval = setInterval(() => {
      setCryptoData(prevData =>
        prevData.map(coin => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.02),
          change: (Math.random() - 0.5) * 10
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const tickerItems = cryptoData.map((coin, index) => (
    <TickerItem key={`${coin.symbol}-${index}`}>
      <CoinSymbol>{coin.symbol}</CoinSymbol>
      <Price change={coin.change}>
        ${coin.price.toLocaleString(undefined, { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}
      </Price>
      <Change change={coin.change}>
        {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
      </Change>
    </TickerItem>
  ));

  return (
    <TickerContainer>
      <TickerTrack
        animate={{ x: [-1000, window.innerWidth] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {[...tickerItems, ...tickerItems]} {/* Duplicate for seamless loop */}
      </TickerTrack>
    </TickerContainer>
  );
};

export default CryptoTicker;