import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { hearthstoneTheme, animations } from '../../../shared/theme/hearthstone';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'legendary';
  size?: 'small' | 'medium' | 'large' | 'hero';
  fullWidth?: boolean;
  glowing?: boolean;
  disabled?: boolean;
}

const buttonHover = keyframes`
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
`;

const ButtonBase = styled.button<ButtonProps>`
  position: relative;
  font-family: 'Belwe Bold', Georgia, serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  border: none;
  overflow: hidden;
  clip-path: ${hearthstoneTheme.polygons.octagon};

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: 0.875rem;
        `;
      case 'medium':
        return css`
          padding: 12px 24px;
          font-size: 1rem;
        `;
      case 'large':
        return css`
          padding: 16px 32px;
          font-size: 1.25rem;
        `;
      case 'hero':
        return css`
          padding: 20px 40px;
          font-size: 1.5rem;
        `;
      default:
        return css`
          padding: 12px 24px;
          font-size: 1rem;
        `;
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: linear-gradient(135deg, #ffd700 0%, #ffa500 50%, #ff8c00 100%);
          color: #1a1a1a;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s;
          }

          &:hover:not(:disabled)::before {
            left: 100%;
          }
        `;
      case 'secondary':
        return css`
          background: ${hearthstoneTheme.textures.stone};
          color: #faf8f6;
          box-shadow:
            0 4px 6px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
        `;
      case 'danger':
        return css`
          background: linear-gradient(135deg, #dc143c 0%, #8b0000 50%, #4b0000 100%);
          color: #ffffff;
          box-shadow:
            0 4px 6px rgba(139, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 100, 100, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
        `;
      case 'success':
        return css`
          background: linear-gradient(135deg, #50c878 0%, #228b22 50%, #006400 100%);
          color: #ffffff;
          box-shadow:
            0 4px 6px rgba(0, 100, 0, 0.3),
            inset 0 1px 0 rgba(144, 238, 144, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
        `;
      case 'legendary':
        return css`
          background: ${hearthstoneTheme.textures.gemstone.diamond};
          color: #ffd700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
          box-shadow:
            0 0 20px rgba(255, 215, 0, 0.5),
            0 0 40px rgba(255, 215, 0, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.2);
          animation: ${animations.glow} 2s ease-in-out infinite;
        `;
      default:
        return css`
          background: ${hearthstoneTheme.textures.wood};
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
      animation: ${animations.pulse} 2s ease-in-out infinite;
      filter: ${hearthstoneTheme.effects.glow.gold};
    `}
  
  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
    filter: brightness(1.1);
    animation: ${buttonHover} 0.3s ease-in-out;
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.5);
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
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
  }
`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'medium', ...props }, ref) => {
    return (
      <ButtonBase ref={ref} variant={variant} size={size} {...props}>
        {children}
      </ButtonBase>
    );
  },
);

Button.displayName = 'Button';

export default Button;
