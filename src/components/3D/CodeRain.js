import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const CodeRain = () => {
  const groupRef = useRef();
  
  const codeSnippets = [
    'pragma solidity ^0.8.0;',
    'contract DeFi {',
    'mapping(address => uint)',
    'function stake() external',
    'require(amount > 0);',
    'emit Transfer(from, to);',
    'web3.eth.getBalance',
    'await contract.mint();',
    'ethers.parseEther("1.0")',
    'keccak256(abi.encode',
    'modifier onlyOwner {',
    'uint256 public price;',
    'IERC20 token = IERC20(',
    'SafeMath.add(a, b)',
    'block.timestamp',
    'msg.sender',
    '0x1234567890abcdef',
    'bytes32 hash =',
    'assembly { hash := ',
    'delegatecall(data)',
    'multicall(calls)',
    'flashloan(amount)',
    'liquidityPool.swap',
    'oracle.getPrice()',
    'governance.vote()',
  ];

  const { positions, colors, scales, speeds, codeTexts } = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const speeds = new Float32Array(count);
    const codeTexts = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 20 + 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      if (Math.random() > 0.8) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.8;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 2] = 0;
      }

      scales[i] = Math.random() * 0.5 + 0.5;
      speeds[i] = Math.random() * 0.02 + 0.01;
      codeTexts.push(codeSnippets[Math.floor(Math.random() * codeSnippets.length)]);
    }

    return { positions, colors, scales, speeds, codeTexts };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        child.position.y -= speeds[index];
        
        if (child.position.y < -10) {
          child.position.y = 15;
          child.position.x = (Math.random() - 0.5) * 20;
        }

        child.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
        
        if (child.material) {
          child.material.opacity = Math.sin(state.clock.elapsedTime * 2 + index) * 0.3 + 0.7;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {codeTexts.map((text, index) => (
        <Text
          key={index}
          position={[
            positions[index * 3],
            positions[index * 3 + 1],
            positions[index * 3 + 2]
          ]}
          fontSize={0.3}
          color={new THREE.Color(colors[index * 3], colors[index * 3 + 1], colors[index * 3 + 2])}
          anchorX="center"
          anchorY="middle"
          font="/fonts/RobotoMono-Regular.woff"
        >
          {text}
        </Text>
      ))}
    </group>
  );
};

export default CodeRain;