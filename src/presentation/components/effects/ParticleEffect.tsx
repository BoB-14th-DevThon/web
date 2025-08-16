import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface ParticleEffectProps {
  type: 'gold' | 'fire' | 'frost' | 'arcane' | 'holy';
  x: number;
  y: number;
  duration?: number;
  onComplete?: () => void;
}

const sparkle = keyframes`
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 1;
  }
  50% {
    transform: translate(var(--tx), var(--ty)) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(var(--tx2), var(--ty2)) scale(0);
    opacity: 0;
  }
`;

const burst = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.5) rotate(180deg);
    opacity: 0.6;
  }
  100% {
    transform: scale(3) rotate(360deg);
    opacity: 0;
  }
`;

const EffectContainer = styled.div<{ x: number; y: number }>`
  position: fixed;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  pointer-events: none;
  z-index: 9999;
`;

const Particle = styled.div<{
  delay: number;
  type: string;
  index: number;
}>`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${({ type }) => {
    switch (type) {
      case 'gold':
        return 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 100%)';
      case 'fire':
        return 'radial-gradient(circle, #FF6347 0%, #FF4500 50%, transparent 100%)';
      case 'frost':
        return 'radial-gradient(circle, #87CEEB 0%, #4169E1 50%, transparent 100%)';
      case 'arcane':
        return 'radial-gradient(circle, #DDA0DD 0%, #9400D3 50%, transparent 100%)';
      case 'holy':
        return 'radial-gradient(circle, #FFFACD 0%, #FFD700 50%, transparent 100%)';
      default:
        return 'radial-gradient(circle, #FFFFFF 0%, #CCCCCC 50%, transparent 100%)';
    }
  }};
  border-radius: 50%;
  animation: ${sparkle} 1s ease-out ${(props) => props.delay}s forwards;
  --tx: ${() => (Math.random() - 0.5) * 100}px;
  --ty: ${() => (Math.random() - 0.5) * 100}px;
  --tx2: ${() => (Math.random() - 0.5) * 200}px;
  --ty2: ${() => (Math.random() - 0.5) * 200 + 50}px;
`;

const BurstEffect = styled.div<{ type: string }>`
  position: absolute;
  width: 100px;
  height: 100px;
  left: -50px;
  top: -50px;
  background: ${({ type }) => {
    switch (type) {
      case 'gold':
        return 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)';
      case 'fire':
        return 'radial-gradient(circle, rgba(255, 99, 71, 0.4) 0%, transparent 70%)';
      case 'frost':
        return 'radial-gradient(circle, rgba(135, 206, 235, 0.4) 0%, transparent 70%)';
      case 'arcane':
        return 'radial-gradient(circle, rgba(221, 160, 221, 0.4) 0%, transparent 70%)';
      case 'holy':
        return 'radial-gradient(circle, rgba(255, 250, 205, 0.4) 0%, transparent 70%)';
      default:
        return 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)';
    }
  }};
  border-radius: 50%;
  animation: ${burst} 0.8s ease-out forwards;
`;

const ParticleEffect: React.FC<ParticleEffectProps> = ({
  type,
  x,
  y,
  duration = 2000,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <EffectContainer ref={containerRef} x={x} y={y}>
      <BurstEffect type={type} />
      {Array.from({ length: 12 }).map((_, index) => (
        <Particle key={index} type={type} index={index} delay={index * 0.05} />
      ))}
    </EffectContainer>
  );
};

export default ParticleEffect;
