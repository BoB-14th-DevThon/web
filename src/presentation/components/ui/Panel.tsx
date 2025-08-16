import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { hearthstoneTheme, animations } from '../../../shared/theme/hearthstone';

interface PanelProps {
  variant?: 'stone' | 'wood' | 'metal' | 'parchment' | 'magical';
  size?: 'compact' | 'normal' | 'spacious';
  elevation?: 'flat' | 'raised' | 'floating';
  bordered?: boolean;
  ornate?: boolean;
  glowing?: boolean;
  children?: React.ReactNode;
}

const PanelContainer = styled.div<PanelProps>`
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  ${({ size }) => {
    switch (size) {
      case 'compact':
        return css`
          padding: 16px;
        `;
      case 'normal':
        return css`
          padding: 24px;
        `;
      case 'spacious':
        return css`
          padding: 32px;
        `;
      default:
        return css`
          padding: 24px;
        `;
    }
  }}

  ${({ variant }) => {
    switch (variant) {
      case 'stone':
        return css`
          background: ${hearthstoneTheme.textures.stone};
          color: #faf8f6;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
        `;
      case 'wood':
        return css`
          background: ${hearthstoneTheme.textures.wood};
          color: #faf8f6;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
        `;
      case 'metal':
        return css`
          background: ${hearthstoneTheme.textures.metal};
          color: #1a1a1a;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
        `;
      case 'parchment':
        return css`
          background: ${hearthstoneTheme.textures.parchment};
          color: #1a1a1a;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        `;
      case 'magical':
        return css`
          background: ${hearthstoneTheme.textures.magical.arcane};
          color: #ffffff;
          box-shadow:
            inset 0 0 20px rgba(138, 43, 226, 0.3),
            0 0 30px rgba(138, 43, 226, 0.2);
        `;
      default:
        return css`
          background: ${hearthstoneTheme.textures.stone};
          color: #faf8f6;
        `;
    }
  }}
  
  ${({ elevation }) => {
    switch (elevation) {
      case 'flat':
        return css`
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        `;
      case 'raised':
        return css`
          box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.1);
        `;
      case 'floating':
        return css`
          box-shadow:
            0 8px 16px rgba(0, 0, 0, 0.4),
            0 16px 32px rgba(0, 0, 0, 0.2),
            0 24px 48px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        `;
      default:
        return '';
    }
  }}
  
  ${({ bordered }) =>
    bordered &&
    css`
      border: 3px solid rgba(255, 215, 0, 0.3);
      box-shadow:
        inset 0 0 0 1px rgba(255, 215, 0, 0.1),
        0 0 0 1px rgba(0, 0, 0, 0.3);
    `}
  
  ${({ ornate }) =>
    ornate &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${hearthstoneTheme.patterns.celtic};
        opacity: 0.1;
        pointer-events: none;
      }

      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(
          45deg,
          #ffd700 0%,
          transparent 25%,
          transparent 75%,
          #ffd700 100%
        );
        opacity: 0.3;
        pointer-events: none;
        z-index: -1;
      }
    `}
  
  ${({ glowing }) =>
    glowing &&
    css`
      animation: ${animations.pulse} 3s ease-in-out infinite;
      filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.4));
    `}
`;

const PanelHeader = styled.div`
  position: relative;
  margin: -24px -24px 24px -24px;
  padding: 16px 24px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    transparent 100%
  );
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #ffd700 20%, #ffd700 80%, transparent 100%);
  }
`;

const PanelTitle = styled.h2`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.75rem;
  font-weight: bold;
  color: #ffd700;
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.3);
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const PanelContent = styled.div`
  position: relative;
  z-index: 1;
`;

const PanelFooter = styled.div`
  position: relative;
  margin: 24px -24px -24px -24px;
  padding: 16px 24px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  border-top: 2px solid rgba(255, 215, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #ffd700 20%, #ffd700 80%, transparent 100%);
  }
`;

const PanelDivider = styled.div`
  position: relative;
  height: 2px;
  margin: 16px 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 215, 0, 0.3) 20%,
    rgba(255, 215, 0, 0.3) 80%,
    transparent 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
    clip-path: ${hearthstoneTheme.polygons.diamond};
  }
`;

export const Panel: React.FC<PanelProps & { title?: string }> = ({ children, title, ...props }) => {
  return (
    <PanelContainer {...props}>
      {title && (
        <PanelHeader>
          <PanelTitle>{title}</PanelTitle>
        </PanelHeader>
      )}
      <PanelContent>{children}</PanelContent>
    </PanelContainer>
  );
};

export { PanelContainer, PanelHeader, PanelTitle, PanelContent, PanelFooter, PanelDivider };
