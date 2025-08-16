import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface PanelProps {
  children: React.ReactNode;
  variant?: 'wood' | 'stone' | 'metal' | 'parchment';
  size?: 'small' | 'medium' | 'large' | 'full';
  glowing?: boolean;
  className?: string;
}

const PanelContainer = styled.div<PanelProps>`
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  /* 하스스톤 스타일 테두리 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 4px solid;
    border-image: linear-gradient(
        135deg,
        #8b6914 0%,
        #daa520 25%,
        #ffd700 50%,
        #daa520 75%,
        #8b6914 100%
      )
      1;
    border-radius: 8px;
    pointer-events: none;
  }

  /* 코너 장식 */
  &::after {
    content: '';
    position: absolute;
    inset: -2px;
    background:
      radial-gradient(circle at 0% 0%, #ffd700 0%, transparent 30%),
      radial-gradient(circle at 100% 0%, #ffd700 0%, transparent 30%),
      radial-gradient(circle at 100% 100%, #ffd700 0%, transparent 30%),
      radial-gradient(circle at 0% 100%, #ffd700 0%, transparent 30%);
    pointer-events: none;
    opacity: 0.3;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'wood':
        return css`
          background:
            linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
            linear-gradient(
              180deg,
              #8b4513 0%,
              #a0522d 20%,
              #8b4513 40%,
              #654321 60%,
              #8b4513 80%,
              #a0522d 100%
            );
          box-shadow:
            inset 0 2px 10px rgba(0, 0, 0, 0.5),
            0 8px 16px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(139, 69, 19, 0.3);
        `;
      case 'stone':
        return css`
          background:
            linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
            linear-gradient(135deg, #696969 0%, #808080 25%, #a9a9a9 50%, #808080 75%, #696969 100%);
          box-shadow:
            inset 0 2px 10px rgba(0, 0, 0, 0.5),
            0 8px 16px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(105, 105, 105, 0.3);
        `;
      case 'metal':
        return css`
          background:
            linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)),
            linear-gradient(135deg, #c0c0c0 0%, #e5e5e5 25%, #c0c0c0 50%, #999999 75%, #c0c0c0 100%);
          box-shadow:
            inset 0 2px 10px rgba(255, 255, 255, 0.5),
            0 8px 16px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(192, 192, 192, 0.3);
        `;
      case 'parchment':
        return css`
          background:
            linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1)),
            linear-gradient(135deg, #f4e8d0 0%, #e8d7b9 25%, #f4e8d0 50%, #d4c4a8 75%, #f4e8d0 100%);
          box-shadow:
            inset 0 2px 10px rgba(0, 0, 0, 0.2),
            0 4px 8px rgba(0, 0, 0, 0.5);

          &::before {
            border-image: linear-gradient(
                135deg,
                #8b6914 0%,
                #a0826d 25%,
                #8b7355 50%,
                #a0826d 75%,
                #8b6914 100%
              )
              1;
          }
        `;
      default:
        return css`
          background:
            linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
            linear-gradient(
              180deg,
              #8b4513 0%,
              #a0522d 20%,
              #8b4513 40%,
              #654321 60%,
              #8b4513 80%,
              #a0522d 100%
            );
        `;
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 16px;
          min-height: 120px;
        `;
      case 'medium':
        return css`
          padding: 24px;
          min-height: 200px;
        `;
      case 'large':
        return css`
          padding: 32px;
          min-height: 400px;
        `;
      case 'full':
        return css`
          padding: 40px;
          min-height: 100vh;
          width: 100%;
        `;
      default:
        return css`
          padding: 24px;
        `;
    }
  }}

  ${({ glowing }) =>
    glowing &&
    css`
      &::before {
        animation: glow 2s ease-in-out infinite;
        box-shadow:
          0 0 20px rgba(255, 215, 0, 0.8),
          inset 0 0 20px rgba(255, 215, 0, 0.3);
      }
    `}

  @keyframes glow {
    0%,
    100% {
      opacity: 0.8;
      filter: brightness(1);
    }
    50% {
      opacity: 1;
      filter: brightness(1.2);
    }
  }
`;

const InnerContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
`;

const HearthstonePanel: React.FC<PanelProps> = ({
  children,
  variant = 'wood',
  size = 'medium',
  glowing = false,
  className,
}) => {
  return (
    <PanelContainer variant={variant} size={size} glowing={glowing} className={className}>
      <InnerContent>{children}</InnerContent>
    </PanelContainer>
  );
};

export default HearthstonePanel;
