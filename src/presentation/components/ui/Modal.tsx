import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { hearthstoneTheme } from '../../../shared/theme/hearthstone';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  children?: React.ReactNode;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div<{ size?: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${hearthstoneTheme.textures.stone};
  border: 4px solid #ffd700;
  border-radius: 16px;
  box-shadow:
    0 0 40px rgba(255, 215, 0, 0.3),
    0 16px 32px rgba(0, 0, 0, 0.5),
    inset 0 0 0 2px rgba(255, 215, 0, 0.2);
  animation: ${scaleIn} 0.3s ease-out;
  overflow: hidden;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 400px;
          max-height: 500px;
        `;
      case 'medium':
        return css`
          width: 600px;
          max-height: 700px;
        `;
      case 'large':
        return css`
          width: 800px;
          max-height: 900px;
        `;
      case 'fullscreen':
        return css`
          width: calc(100vw - 100px);
          height: calc(100vh - 100px);
          max-width: 1400px;
          max-height: 900px;
        `;
      default:
        return css`
          width: 600px;
          max-height: 700px;
        `;
    }
  }}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${hearthstoneTheme.patterns.celtic};
    opacity: 0.05;
    pointer-events: none;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 24px 32px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
  border-bottom: 3px solid rgba(255, 215, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent 0%, #ffd700 10%, #ffd700 90%, transparent 100%);
  }
`;

const ModalTitle = styled.h2`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 2rem;
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

const ModalCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #dc143c 0%, #8b0000 100%);
  border: 2px solid #ffd700;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 0 20px rgba(220, 20, 60, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ModalContent = styled.div`
  padding: 32px;
  max-height: calc(100% - 100px);
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ffd700 0%, #b8860b 100%);
    border-radius: 6px;
    border: 2px solid rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ffa500 0%, #ffd700 100%);
  }
`;

const ModalFooter = styled.div`
  padding: 24px 32px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
  border-top: 3px solid rgba(255, 215, 0, 0.3);
  display: flex;
  justify-content: center;
  gap: 16px;

  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent 0%, #ffd700 10%, #ffd700 90%, transparent 100%);
  }
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'medium',
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContainer size={size} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export { ModalFooter };
