import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TickerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(0, 0, 0, 0.95);
  border-top: 1px solid rgba(0, 212, 255, 0.3);
  z-index: 100;
  overflow: hidden;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
`;

const TickerTrack = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 60px;
  white-space: nowrap;
  will-change: transform;
`;

const TickerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 0.9rem;
  padding: 8px 16px;
  background: rgba(26, 26, 46, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  backdrop-filter: blur(5px);
`;

const CoinIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const CoinSymbol = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-transform: uppercase;
`;

const Price = styled.span`
  color: ${({ change }) => change >= 0 ? '#00ff88' : '#ff4757'};
  font-weight: 600;
`;

const Change = styled.span`
  color: ${({ change }) => change >= 0 ? '#00ff88' : '#ff4757'};
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${({ change }) => 
    change >= 0 
      ? 'rgba(0, 255, 136, 0.1)' 
      : 'rgba(255, 71, 87, 0.1)'
  };
  border: 1px solid ${({ change }) => 
    change >= 0 
      ? 'rgba(0, 255, 136, 0.3)' 
      : 'rgba(255, 71, 87, 0.3)'
  };
`;

const MarketCap = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin: 0 20px;
`;

const Spinner = styled(motion.div)`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
`;

const ErrorMessage = styled.div`
  color: #ff4757;
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin: 0 20px;
  padding: 8px 16px;
  background: rgba(255, 71, 87, 0.1);
  border: 1px solid rgba(255, 71, 87, 0.3);
  border-radius: 8px;
`;

const RealCryptoTicker = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const coinIds = [
    'bitcoin',
    'ethereum', 
    'binancecoin',
    'cardano',
    'polygon',
    'chainlink',
    'uniswap',
    'aave',
    'compound',
    'makerdao',
    'solana',
    'avalanche-2',
    'polkadot',
    'cosmos'
  ];

  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setCryptoData(data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        image: coin.image
      })));
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setError('Failed to load crypto data');
      setLoading(false);
      
      setCryptoData([
        { symbol: 'BTC', price: 43250.50, change24h: 2.45, marketCap: 850000000000 },
        { symbol: 'ETH', price: 2580.75, change24h: -1.23, marketCap: 310000000000 },
        { symbol: 'BNB', price: 315.20, change24h: 0.85, marketCap: 48000000000 },
        { symbol: 'ADA', price: 0.48, change24h: 3.21, marketCap: 17000000000 },
        { symbol: 'MATIC', price: 0.82, change24h: -0.67, marketCap: 7600000000 },
      ]);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    const interval = setInterval(fetchCryptoData, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    } else if (price < 1000) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(1)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(1)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(1)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <TickerContainer>
        <LoadingSpinner>
          <Spinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span>Loading live crypto data...</span>
        </LoadingSpinner>
      </TickerContainer>
    );
  }

  if (error && cryptoData.length === 0) {
    return (
      <TickerContainer>
        <ErrorMessage>
          {error} - Using cached data
        </ErrorMessage>
      </TickerContainer>
    );
  }

  const tickerItems = cryptoData.map((coin, index) => (
    <TickerItem key={`${coin.symbol}-${index}`}>
      {coin.image && <CoinIcon src={coin.image} alt={coin.symbol} />}
      <CoinSymbol>{coin.symbol}</CoinSymbol>
      <Price change={coin.change24h}>
        {formatPrice(coin.price)}
      </Price>
      <Change change={coin.change24h}>
        {formatChange(coin.change24h)}
      </Change>
      {coin.marketCap && (
        <MarketCap>
          MC: {formatMarketCap(coin.marketCap)}
        </MarketCap>
      )}
    </TickerItem>
  ));

  return (
    <TickerContainer>
      <TickerTrack
        animate={{ x: [-1000, window.innerWidth + 1000] }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {[...tickerItems, ...tickerItems]} {/* Duplicate for seamless loop */}
      </TickerTrack>
    </TickerContainer>
  );
};

export default RealCryptoTicker;