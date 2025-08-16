import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

interface HearthstoneButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'menu' | 'play' | 'cancel' | 'confirm';
  size?: 'small' | 'medium' | 'large' | 'hero';
  glowing?: boolean;
  fullWidth?: boolean;
}

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const hover = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
`;

const StyledButton = styled.button<HearthstoneButtonProps>`
  position: relative;
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(0, 0, 0, 0.5);

  /* 기본 나무 텍스처 배경 */
  background: linear-gradient(
    180deg,
    rgba(139, 69, 19, 0.9) 0%,
    rgba(160, 82, 45, 0.9) 20%,
    rgba(139, 69, 19, 0.9) 40%,
    rgba(101, 67, 33, 0.9) 60%,
    rgba(139, 69, 19, 0.9) 80%,
    rgba(160, 82, 45, 0.9) 100%
  );

  /* 하스스톤 스타일 모서리 */
  clip-path: polygon(
    15px 0%,
    calc(100% - 15px) 0%,
    100% 15px,
    100% calc(100% - 15px),
    calc(100% - 15px) 100%,
    15px 100%,
    0% calc(100% - 15px),
    0% 15px
  );

  /* 황금 테두리 */
  &::before {
    content: '';
    position: absolute;
    inset: 3px;
    background: linear-gradient(
      180deg,
      #2c1810 0%,
      #3d241a 20%,
      #2c1810 40%,
      #1f120c 60%,
      #2c1810 80%,
      #3d241a 100%
    );
    clip-path: polygon(
      12px 0%,
      calc(100% - 12px) 0%,
      100% 12px,
      100% calc(100% - 12px),
      calc(100% - 12px) 100%,
      12px 100%,
      0% calc(100% - 12px),
      0% 12px
    );
    z-index: -1;
  }

  /* 빛나는 테두리 효과 */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.4), transparent);
    background-size: 200% 100%;
    opacity: 0;
    transition: opacity 0.3s;
    clip-path: inherit;
  }

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 10px 20px;
          font-size: 14px;
          min-width: 120px;
        `;
      case 'medium':
        return css`
          padding: 16px 32px;
          font-size: 18px;
          min-width: 180px;
        `;
      case 'large':
        return css`
          padding: 20px 40px;
          font-size: 22px;
          min-width: 240px;
        `;
      case 'hero':
        return css`
          padding: 24px 48px;
          font-size: 28px;
          min-width: 300px;
        `;
      default:
        return css`
          padding: 16px 32px;
          font-size: 18px;
          min-width: 180px;
        `;
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case 'play':
        return css`
          color: #ffe4b5;
          background: linear-gradient(
            180deg,
            rgba(255, 140, 0, 0.9) 0%,
            rgba(255, 165, 0, 0.9) 20%,
            rgba(255, 140, 0, 0.9) 40%,
            rgba(255, 99, 71, 0.9) 60%,
            rgba(255, 140, 0, 0.9) 80%,
            rgba(255, 165, 0, 0.9) 100%
          );

          &:hover::after {
            animation: ${shimmer} 2s linear infinite;
            opacity: 1;
          }
        `;
      case 'cancel':
        return css`
          color: #ffb6c1;
          background: linear-gradient(
            180deg,
            rgba(139, 0, 0, 0.9) 0%,
            rgba(178, 34, 34, 0.9) 20%,
            rgba(139, 0, 0, 0.9) 40%,
            rgba(100, 0, 0, 0.9) 60%,
            rgba(139, 0, 0, 0.9) 80%,
            rgba(178, 34, 34, 0.9) 100%
          );
        `;
      case 'confirm':
        return css`
          color: #98fb98;
          background: linear-gradient(
            180deg,
            rgba(34, 139, 34, 0.9) 0%,
            rgba(50, 205, 50, 0.9) 20%,
            rgba(34, 139, 34, 0.9) 40%,
            rgba(0, 100, 0, 0.9) 60%,
            rgba(34, 139, 34, 0.9) 80%,
            rgba(50, 205, 50, 0.9) 100%
          );
        `;
      default:
        return css`
          color: #faf8f6;
        `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ glowing }) =>
    glowing &&
    css`
      box-shadow:
        0 0 30px rgba(255, 215, 0, 0.8),
        0 0 60px rgba(255, 215, 0, 0.4);

      &::after {
        opacity: 1;
        animation: ${shimmer} 2s linear infinite;
      }
    `}

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
    animation: ${hover} 0.3s ease-in-out;
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(255, 215, 0, 0.6);

    &::after {
      opacity: 1;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.8);
  }
`;

const ButtonContent = styled.span`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const HearthstoneButton: React.FC<HearthstoneButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <ButtonContent>{children}</ButtonContent>
    </StyledButton>
  );
};

export default HearthstoneButton;
