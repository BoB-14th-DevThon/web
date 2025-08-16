import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface CardPlayAnimationProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  cardImage?: string;
  onComplete?: () => void;
}

const flyToBoard = keyframes`
  0% {
    transform: translate(0, 0) scale(1) rotateY(0deg);
    opacity: 1;
  }
  50% {
    transform: translate(var(--midX), var(--midY)) scale(1.5) rotateY(180deg);
    opacity: 1;
  }
  90% {
    transform: translate(var(--endX), var(--endY)) scale(1.2) rotateY(360deg);
    opacity: 1;
  }
  100% {
    transform: translate(var(--endX), var(--endY)) scale(1) rotateY(360deg);
    opacity: 1;
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 215, 0, 0.8),
      0 0 40px rgba(255, 215, 0, 0.6),
      0 0 60px rgba(255, 215, 0, 0.4);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 215, 0, 1),
      0 0 60px rgba(255, 215, 0, 0.8),
      0 0 90px rgba(255, 215, 0, 0.6);
  }
`;

const impact = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(2);
    opacity: 0.5;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
`;

const AnimationContainer = styled.div<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}>`
  position: fixed;
  left: ${(props) => props.startX}px;
  top: ${(props) => props.startY}px;
  pointer-events: none;
  z-index: 9999;
  --endX: ${(props) => props.endX - props.startX}px;
  --endY: ${(props) => props.endY - props.startY}px;
  --midX: ${(props) => (props.endX - props.startX) / 2}px;
  --midY: ${(props) => (props.endY - props.startY) / 2 - 100}px;
`;

const FlyingCard = styled.div<{ cardImage?: string }>`
  width: 150px;
  height: 210px;
  background: ${(props) =>
    props.cardImage
      ? `url(${props.cardImage}) center/cover`
      : 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'};
  border: 3px solid #ffd700;
  border-radius: 8px;
  animation:
    ${flyToBoard} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards,
    ${glowPulse} 0.8s ease-in-out;
  transform-style: preserve-3d;

  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
    border-radius: 50%;
    animation: ${impact} 0.4s ease-out 0.6s forwards;
  }
`;

const TrailParticle = styled.div<{ delay: number; index: number }>`
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #ffd700 0%, #ffa500 50%, transparent 100%);
  border-radius: 50%;
  left: 75px;
  top: 105px;
  opacity: 0;
  animation: trail 0.6s ease-out ${(props) => props.delay}s forwards;

  @keyframes trail {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(${(Math.random() - 0.5) * 50}px, ${Math.random() * 30 + 20}px) scale(0);
      opacity: 0;
    }
  }
`;

const ImpactWave = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  left: -25px;
  top: 5px;
  border: 3px solid #ffd700;
  border-radius: 50%;
  opacity: 0;
  animation: wave 0.6s ease-out 0.7s forwards;

  @keyframes wave {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const CardPlayAnimation: React.FC<CardPlayAnimationProps> = ({
  startX,
  startY,
  endX,
  endY,
  cardImage,
  onComplete,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimationContainer startX={startX} startY={startY} endX={endX} endY={endY}>
      <FlyingCard cardImage={cardImage}>
        {Array.from({ length: 8 }).map((_, index) => (
          <TrailParticle key={index} index={index} delay={index * 0.05} />
        ))}
      </FlyingCard>
      <ImpactWave />
    </AnimationContainer>
  );
};

export default CardPlayAnimation;
