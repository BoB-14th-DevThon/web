import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { hearthstoneTheme, animations, cardRarityStyles } from '../../../shared/theme/hearthstone';

interface CardProps {
  variant?: 'default' | 'hover' | 'selected' | 'disabled';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  size?: 'small' | 'medium' | 'large';
  elevation?: 'none' | 'low' | 'medium' | 'high';
  glowing?: boolean;
  interactive?: boolean;
  children?: React.ReactNode;
}

const CardContainer = styled.div<CardProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: ${hearthstoneTheme.polygons.card};

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 200px;
          min-height: 280px;
          padding: 16px;
        `;
      case 'medium':
        return css`
          width: 300px;
          min-height: 400px;
          padding: 24px;
        `;
      case 'large':
        return css`
          width: 400px;
          min-height: 520px;
          padding: 32px;
        `;
      default:
        return css`
          width: 300px;
          min-height: 400px;
          padding: 24px;
        `;
    }
  }}

  ${({ rarity = 'common' }) => css`
    background: ${cardRarityStyles[rarity].background};
    border: ${cardRarityStyles[rarity].border};
    filter: ${cardRarityStyles[rarity].glow};
  `}
  
  ${({ elevation }) => {
    switch (elevation) {
      case 'none':
        return css`
          box-shadow: none;
        `;
      case 'low':
        return css`
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        `;
      case 'medium':
        return css`
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        `;
      case 'high':
        return css`
          box-shadow:
            0 8px 16px rgba(0, 0, 0, 0.4),
            0 16px 32px rgba(0, 0, 0, 0.2);
        `;
      default:
        return css`
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'hover':
        return css`
          transform: translateY(-4px) scale(1.02);
          filter: brightness(1.1);
        `;
      case 'selected':
        return css`
          outline: 3px solid #ffd700;
          outline-offset: 2px;
          filter: brightness(1.15);
        `;
      case 'disabled':
        return css`
          opacity: 0.5;
          filter: grayscale(0.8);
          cursor: not-allowed;
        `;
      default:
        return '';
    }
  }}
  
  ${({ glowing }) =>
    glowing &&
    css`
      animation: ${animations.glow} 2s ease-in-out infinite;
    `}
  
  ${({ interactive }) =>
    interactive &&
    css`
      cursor: pointer;

      &:hover:not([data-disabled='true']) {
        transform: translateY(-4px) scale(1.02);
        filter: brightness(1.1);
      }

      &:active:not([data-disabled='true']) {
        transform: translateY(0) scale(0.98);
        filter: brightness(0.95);
      }
    `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${hearthstoneTheme.patterns.hexagon};
    opacity: 0.05;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 40%,
      transparent 60%,
      rgba(0, 0, 0, 0.2) 100%
    );
    pointer-events: none;
  }
`;

const CardHeader = styled.div`
  position: relative;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ffd700, transparent);
  }
`;

const CardTitle = styled.h3`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #ffd700;
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(255, 215, 0, 0.3);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardContent = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  color: #faf8f6;
  font-family: 'Franklin Gothic', Arial, sans-serif;
  z-index: 1;
`;

const CardFooter = styled.div`
  position: relative;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 2px solid rgba(255, 215, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #ffd700, transparent);
  }
`;

const CardBadge = styled.span<{ type: 'mana' | 'attack' | 'health' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);

  ${({ type }) => {
    switch (type) {
      case 'mana':
        return css`
          background: radial-gradient(circle, #4fc3f7 0%, #2196f3 50%, #1565c0 100%);
          box-shadow: 0 0 10px rgba(79, 195, 247, 0.6);
        `;
      case 'attack':
        return css`
          background: radial-gradient(circle, #ffb74d 0%, #ff9800 50%, #e65100 100%);
          box-shadow: 0 0 10px rgba(255, 183, 77, 0.6);
        `;
      case 'health':
        return css`
          background: radial-gradient(circle, #ff6b6b 0%, #f44336 50%, #c62828 100%);
          box-shadow: 0 0 10px rgba(255, 107, 107, 0.6);
        `;
    }
  }}
`;

export const Card: React.FC<CardProps & { title?: string }> = ({ children, title, ...props }) => {
  return (
    <CardContainer {...props}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
};

export { CardContainer, CardHeader, CardTitle, CardContent, CardFooter, CardBadge };
