import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { hearthstoneTheme, animations } from '../../shared/theme/hearthstone';
import Button from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';

const LobbyContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 25%,
    #0f3460 50%,
    #16213e 75%,
    #1a1a2e 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${hearthstoneTheme.patterns.hexagon};
    opacity: 0.03;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(255, 215, 0, 0.05) 40%,
      transparent 70%
    );
    animation: ${animations.rotate} 60s linear infinite;
    pointer-events: none;
  }
`;

const Header = styled.header`
  padding: 24px 48px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  position: relative;
`;

const Logo = styled.div`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #ffd700 0%, #ffa500 50%, #ff8c00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: ${animations.glow} 3s ease-in-out infinite;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${hearthstoneTheme.textures.gemstone.diamond};
  border: 3px solid #ffd700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  font-weight: bold;
`;

const UserName = styled.span`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.25rem;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  padding: 48px;
  gap: 48px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  z-index: 1;
  position: relative;
`;

const MenuSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 32px;
`;

const MenuCard = styled.div<{ isActive?: boolean }>`
  position: relative;
  background: ${hearthstoneTheme.textures.stone};
  border: 3px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  clip-path: ${hearthstoneTheme.polygons.card};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 215, 0, 0.1) 0%,
      transparent 50%,
      rgba(255, 215, 0, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: #ffd700;
    box-shadow:
      0 8px 16px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(255, 215, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: #ffd700;
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
      animation: ${animations.pulse} 2s ease-in-out infinite;
    `}
`;

const MenuCardIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: radial-gradient(circle, #ffd700 0%, #ffa500 50%, #ff8c00 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const MenuCardTitle = styled.h3`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.5rem;
  color: #ffd700;
  text-align: center;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const MenuCardDescription = styled.p`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 0.9rem;
  color: #faf8f6;
  text-align: center;
  margin: 0;
  opacity: 0.8;
`;

const NewsSection = styled.div`
  width: 400px;
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const NewsItem = styled.div`
  padding: 16px;
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid #ffd700;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: translateX(4px);
  }
`;

const NewsTitle = styled.h4`
  font-family: 'Belwe Bold', Georgia, serif;
  color: #ffd700;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
`;

const NewsContent = styled.p`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  color: #faf8f6;
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const NewsDate = styled.span`
  font-size: 0.8rem;
  color: #999;
  display: block;
  margin-top: 8px;
`;

const QueueStatus = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: ${hearthstoneTheme.textures.wood};
  border: 3px solid #ffd700;
  border-radius: 12px;
  padding: 20px 32px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  z-index: 100;
  animation: ${animations.slideInRight} 0.5s ease-out;
`;

const QueueText = styled.div`
  font-family: 'Belwe Bold', Georgia, serif;
  color: #ffd700;
  font-size: 1.2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 12px;
`;

const QueueTimer = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  color: #faf8f6;
  font-size: 1.5rem;
  text-align: center;
`;

const LobbyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  // const [_queueTime, setQueueTime] = useState(0);

  const handlePlayClick = () => {
    setIsSearching(true);
    setTimeout(() => {
      navigate('/matchmaking');
    }, 2000);
  };

  const menuItems = [
    {
      icon: '⚔️',
      title: 'Play',
      description: 'Battle against other players',
      action: handlePlayClick,
    },
    {
      icon: '📚',
      title: 'Collection',
      description: 'Manage your card collection',
      action: () => navigate('/collection'),
    },
    {
      icon: '🏆',
      title: 'Ranked',
      description: 'Climb the competitive ladder',
      action: () => navigate('/ranked'),
    },
    {
      icon: '🎯',
      title: 'Practice',
      description: 'Hone your skills against AI',
      action: () => navigate('/practice'),
    },
  ];

  const news = [
    {
      title: 'New Expansion Released!',
      content: 'Discover 135 new cards in the latest expansion.',
      date: '2025-01-15',
    },
    {
      title: 'Balance Update',
      content: 'Several cards have been adjusted for better gameplay.',
      date: '2025-01-14',
    },
    {
      title: 'Weekend Tournament',
      content: 'Join the weekend tournament for exclusive rewards.',
      date: '2025-01-13',
    },
  ];

  return (
    <LobbyContainer>
      <Header>
        <Logo>BobStone</Logo>
        <UserInfo>
          <UserName>Player#1234</UserName>
          <UserAvatar>P</UserAvatar>
        </UserInfo>
      </Header>

      <MainContent>
        <MenuSection>
          <Panel variant="wood" size="spacious" bordered ornate>
            <MenuGrid>
              {menuItems.map((item, index) => (
                <MenuCard
                  key={index}
                  onClick={item.action}
                  isActive={item.title === 'Play' && isSearching}
                >
                  <MenuCardIcon>{item.icon}</MenuCardIcon>
                  <MenuCardTitle>{item.title}</MenuCardTitle>
                  <MenuCardDescription>{item.description}</MenuCardDescription>
                </MenuCard>
              ))}
            </MenuGrid>
          </Panel>

          <Panel variant="parchment" size="normal" bordered>
            <h3
              style={{
                fontFamily: 'Belwe Bold, Georgia, serif',
                color: '#8B4513',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              Daily Quests
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button variant="secondary" size="medium" fullWidth>
                Win 3 Games (1/3)
              </Button>
              <Button variant="secondary" size="medium" fullWidth>
                Play 10 Cards (5/10)
              </Button>
            </div>
          </Panel>
        </MenuSection>

        <NewsSection>
          <Panel variant="stone" size="normal" bordered title="Latest News">
            <NewsList>
              {news.map((item, index) => (
                <NewsItem key={index}>
                  <NewsTitle>{item.title}</NewsTitle>
                  <NewsContent>{item.content}</NewsContent>
                  <NewsDate>{item.date}</NewsDate>
                </NewsItem>
              ))}
            </NewsList>
          </Panel>

          <div style={{ marginTop: '24px' }}>
            <Panel variant="magical" size="normal" bordered glowing>
              <h3
                style={{
                  fontFamily: 'Belwe Bold, Georgia, serif',
                  color: '#FFD700',
                  textAlign: 'center',
                  marginBottom: '16px',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                }}
              >
                Season Rewards
              </h3>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🏅</div>
                <p style={{ color: '#FAF8F6', margin: '0' }}>Rank 15 - Gold Division</p>
                <p style={{ color: '#FFD700', marginTop: '8px' }}>Season ends in 15 days</p>
              </div>
            </Panel>
          </div>
        </NewsSection>
      </MainContent>

      {isSearching && (
        <QueueStatus>
          <QueueText>Searching for opponent...</QueueText>
          <QueueTimer>0:{queueTime.toString().padStart(2, '0')}</QueueTimer>
          <Button
            variant="danger"
            size="small"
            fullWidth
            onClick={() => setIsSearching(false)}
            style={{ marginTop: '12px' }}
          >
            Cancel
          </Button>
        </QueueStatus>
      )}
    </LobbyContainer>
  );
};

export default LobbyPage;
