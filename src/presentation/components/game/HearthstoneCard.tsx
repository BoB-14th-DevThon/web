import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Card as CardEntity } from '@domain/entities/Card';
import { CardRarity } from '@shared/types';

interface HearthstoneCardProps {
  card: CardEntity;
  size?: 'small' | 'normal' | 'large';
  isHovered?: boolean;
  isSelected?: boolean;
  isPlayable?: boolean;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
}

// const glow = keyframes`
//   0%, 100% {
//     box-shadow:
//       0 0 20px rgba(255, 215, 0, 0.6),
//       0 0 40px rgba(255, 215, 0, 0.4);
//   }
//   50% {
//     box-shadow:
//       0 0 30px rgba(255, 215, 0, 0.8),
//       0 0 60px rgba(255, 215, 0, 0.6);
//   }
// `;

const playableGlow = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 20px rgba(0, 255, 0, 0.8),
      0 0 40px rgba(0, 255, 0, 0.6),
      inset 0 0 20px rgba(0, 255, 0, 0.3);
  }
  50% { 
    box-shadow: 
      0 0 30px rgba(0, 255, 0, 1),
      0 0 60px rgba(0, 255, 0, 0.8),
      inset 0 0 30px rgba(0, 255, 0, 0.5);
  }
`;

const CardContainer = styled.div<{
  size: 'small' | 'normal' | 'large';
  isHovered?: boolean;
  isSelected?: boolean;
  isPlayable?: boolean;
  rarity: CardRarity;
}>`
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease-out;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 150px;
          height: 210px;
        `;
      case 'normal':
        return css`
          width: 200px;
          height: 280px;
        `;
      case 'large':
        return css`
          width: 300px;
          height: 420px;
        `;
    }
  }}

  ${({ isHovered }) =>
    isHovered &&
    css`
      transform: translateY(-20px) scale(1.1);
      z-index: 10;
    `}
  
  ${({ isSelected }) =>
    isSelected &&
    css`
      transform: translateY(-30px) scale(1.15);
      z-index: 20;
    `}
  
  ${({ isPlayable }) =>
    isPlayable &&
    css`
      animation: ${playableGlow} 2s ease-in-out infinite;
    `}
`;

const CardFrame = styled.div<{ rarity: CardRarity }>`
  position: absolute;
  inset: 0;
  border-radius: 12px;
  overflow: hidden;

  /* 카드 프레임 */
  &::before {
    content: '';
    position: absolute;
    inset: -8px;
    background: ${({ rarity }) => {
      switch (rarity) {
        case 'LEGENDARY':
          return 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FFA500 75%, #FFD700 100%)';
        case 'EPIC':
          return 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 25%, #9C27B0 50%, #7B1FA2 75%, #9C27B0 100%)';
        case 'RARE':
          return 'linear-gradient(135deg, #2196F3 0%, #1976D2 25%, #2196F3 50%, #1976D2 75%, #2196F3 100%)';
        default:
          return 'linear-gradient(135deg, #757575 0%, #616161 25%, #757575 50%, #616161 75%, #757575 100%)';
      }
    }};
    border-radius: 16px;
    z-index: 1;
  }

  /* 내부 카드 배경 */
  &::after {
    content: '';
    position: absolute;
    inset: 4px;
    background: #1a1a1a;
    border-radius: 8px;
    z-index: 2;
  }
`;

const CardArtwork = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 45%;
  background: url(${(props) => props.imageUrl}) center/cover;
  border-radius: 50% 50% 8px 8px / 60% 60% 8px 8px;
  z-index: 3;
  overflow: hidden;

  /* 아트워크 테두리 */
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(to bottom, #8b6914, #daa520);
    border-radius: inherit;
    z-index: -1;
  }

  /* 기본 이미지가 없을 때 */
  &::after {
    content: '🎴';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    background: radial-gradient(circle, rgba(100, 100, 100, 0.8), rgba(50, 50, 50, 0.9));
  }
`;

const CardName = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background: linear-gradient(180deg, #8b6914 0%, #daa520 50%, #8b6914 100%);
  padding: 8px 16px;
  text-align: center;
  z-index: 4;
  clip-path: polygon(10% 0%, 90% 0%, 95% 50%, 90% 100%, 10% 100%, 5% 50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
`;

const CardNameText = styled.div<{ size: 'small' | 'normal' | 'large' }>`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: 0.7rem;
        `;
      case 'normal':
        return css`
          font-size: 0.9rem;
        `;
      case 'large':
        return css`
          font-size: 1.3rem;
        `;
    }
  }}
`;

const CardDescription = styled.div<{ size: 'small' | 'normal' | 'large' }>`
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #8b6914;
  border-radius: 4px;
  padding: 8px;
  z-index: 4;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: 0.6rem;
          padding: 4px;
        `;
      case 'normal':
        return css`
          font-size: 0.75rem;
          padding: 6px;
        `;
      case 'large':
        return css`
          font-size: 1rem;
          padding: 10px;
        `;
    }
  }}
`;

const CardDescriptionText = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  color: #faf8f6;
  text-align: center;
  line-height: 1.3;
`;

const ManaCost = styled.div<{ size: 'small' | 'normal' | 'large' }>`
  position: absolute;
  top: -5px;
  left: -5px;
  background: radial-gradient(circle, #4fc3f7 0%, #2196f3 40%, #1565c0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 5;
  box-shadow:
    0 0 10px rgba(79, 195, 247, 0.8),
    inset 0 -2px 4px rgba(0, 0, 0, 0.4);

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 30px;
          height: 30px;
          font-size: 1rem;
        `;
      case 'normal':
        return css`
          width: 40px;
          height: 40px;
          font-size: 1.4rem;
        `;
      case 'large':
        return css`
          width: 60px;
          height: 60px;
          font-size: 2rem;
        `;
    }
  }}
`;

const AttackHealth = styled.div<{ type: 'attack' | 'health'; size: 'small' | 'normal' | 'large' }>`
  position: absolute;
  bottom: -5px;
  ${(props) => (props.type === 'attack' ? 'left: -5px;' : 'right: -5px;')}
  background: ${(props) =>
    props.type === 'attack'
      ? 'radial-gradient(circle, #FFB74D 0%, #FF9800 40%, #E65100 100%)'
      : 'radial-gradient(circle, #FF6B6B 0%, #F44336 40%, #C62828 100%)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  color: #ffffff;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 5;
  box-shadow:
    0 0 10px
      ${(props) =>
        props.type === 'attack' ? 'rgba(255, 183, 77, 0.8)' : 'rgba(255, 107, 107, 0.8)'},
    inset 0 -2px 4px rgba(0, 0, 0, 0.4);

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 30px;
          height: 30px;
          font-size: 1rem;
        `;
      case 'normal':
        return css`
          width: 40px;
          height: 40px;
          font-size: 1.4rem;
        `;
      case 'large':
        return css`
          width: 60px;
          height: 60px;
          font-size: 2rem;
        `;
    }
  }}
`;

const HearthstoneCard: React.FC<HearthstoneCardProps> = ({
  card,
  size = 'normal',
  isHovered = false,
  isSelected = false,
  isPlayable = false,
  onClick,
  onHover,
}) => {
  return (
    <CardContainer
      size={size}
      isHovered={isHovered}
      isSelected={isSelected}
      isPlayable={isPlayable}
      rarity={card.rarity}
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <CardFrame rarity={card.rarity} />

      <CardArtwork imageUrl={card.imageUrl} />

      <CardName>
        <CardNameText size={size}>{card.name}</CardNameText>
      </CardName>

      {card.description && (
        <CardDescription size={size}>
          <CardDescriptionText>{card.description}</CardDescriptionText>
        </CardDescription>
      )}

      <ManaCost size={size}>{card.cost}</ManaCost>

      {card.isMinion() && (
        <>
          <AttackHealth type="attack" size={size}>
            {card.attack}
          </AttackHealth>
          <AttackHealth type="health" size={size}>
            {card.health}
          </AttackHealth>
        </>
      )}
    </CardContainer>
  );
};

export default HearthstoneCard;
