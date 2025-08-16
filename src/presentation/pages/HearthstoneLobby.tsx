import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import HearthstoneButton from '../components/ui/HearthstoneButton';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const glow = keyframes`
  0%, 100% { 
    text-shadow: 
      0 0 20px rgba(255, 215, 0, 0.8),
      0 0 40px rgba(255, 215, 0, 0.5),
      0 0 60px rgba(255, 215, 0, 0.3);
  }
  50% { 
    text-shadow: 
      0 0 30px rgba(255, 215, 0, 1),
      0 0 60px rgba(255, 215, 0, 0.7),
      0 0 90px rgba(255, 215, 0, 0.5);
  }
`;

const LobbyContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* 배경 효과 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 50%, rgba(30, 20, 10, 0.8) 0%, rgba(0, 0, 0, 0.95) 70%),
      url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.02"/></svg>');
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 10%;
  animation: ${fadeIn} 1s ease-out;
`;

const Logo = styled.h1`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 7rem;
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
  background: linear-gradient(
    0deg,
    #b8860b 0%,
    #ffd700 20%,
    #fff8dc 50%,
    #ffd700 80%,
    #b8860b 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${glow} 3s ease-in-out infinite;
  position: relative;

  /* 3D 효과 */
  &::before {
    content: 'BOBSTONE';
    position: absolute;
    left: 2px;
    top: 2px;
    color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
  animation: ${fadeIn} 1.2s ease-out 0.3s both;
`;

const BottomRightPanel = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 15px;
  animation: ${fadeIn} 1.4s ease-out 0.6s both;
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  border: 2px solid #8b6914;
  background: linear-gradient(
    135deg,
    rgba(30, 20, 10, 0.9) 0%,
    rgba(50, 35, 20, 0.9) 50%,
    rgba(30, 20, 10, 0.9) 100%
  );
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #b8860b;
  transition: all 0.2s;
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.8);

  &:hover {
    border-color: #ffd700;
    color: #ffd700;
    transform: scale(1.05);
    box-shadow:
      inset 0 1px 2px rgba(0, 0, 0, 0.8),
      0 2px 4px rgba(0, 0, 0, 0.8),
      0 0 15px rgba(255, 215, 0, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HearthstoneLobby: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const menuItems = [
    { id: 'play', label: '플레이', onClick: () => navigate('/matchmaking') },
    { id: 'collection', label: '내 컬렉션', onClick: () => navigate('/collection') },
    { id: 'shop', label: '상점', onClick: () => alert('상점 준비 중!') },
    { id: 'adventure', label: '모험', onClick: () => alert('모험 모드 준비 중!') },
    { id: 'battlegrounds', label: '전장', onClick: () => alert('전장 준비 중!') },
  ];

  return (
    <LobbyContainer>
      <LogoWrapper>
        <Logo>BOBSTONE</Logo>
      </LogoWrapper>

      <MenuContainer>
        {menuItems.map((item) => (
          <HearthstoneButton
            key={item.id}
            size="large"
            variant={item.id === 'play' ? 'play' : 'menu'}
            glowing={hoveredButton === item.id || item.id === 'play'}
            onMouseEnter={() => setHoveredButton(item.id)}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={item.onClick}
          >
            {item.label}
          </HearthstoneButton>
        ))}
      </MenuContainer>

      <BottomRightPanel>
        <IconButton title="친구 목록">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </IconButton>
        <IconButton title="설정" onClick={() => navigate('/settings')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </svg>
        </IconButton>
        <IconButton title="종료" onClick={() => window.close()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </IconButton>
      </BottomRightPanel>
    </LobbyContainer>
  );
};

export default HearthstoneLobby;
