import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { hearthstoneTheme, animations } from '../../shared/theme/hearthstone';
import Button from '../components/ui/Button';
import { Panel } from '../components/ui/Panel';

const MatchmakingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    ellipse at center,
    #1a1a2e 0%,
    #16213e 30%,
    #0f3460 60%,
    #16213e 90%,
    #1a1a2e 100%
  );
  position: relative;
  overflow: hidden;
`;

const portalSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const portalPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const BackgroundEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: ${hearthstoneTheme.textures.magical.arcane};
    border-radius: 50%;
    opacity: 0.3;
    animation: ${portalSpin} 20s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(
      circle,
      transparent 0%,
      rgba(138, 43, 226, 0.1) 40%,
      rgba(138, 43, 226, 0.2) 60%,
      transparent 100%
    );
    animation: ${portalPulse} 3s ease-in-out infinite;
  }
`;

const PortalContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const Portal = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(138, 43, 226, 0.8) 0%,
    rgba(75, 0, 130, 0.6) 30%,
    rgba(25, 25, 112, 0.4) 60%,
    transparent 100%
  );
  box-shadow:
    0 0 60px rgba(138, 43, 226, 0.6),
    inset 0 0 60px rgba(138, 43, 226, 0.4);
  animation: ${portalSpin} 10s linear infinite reverse;
`;

const PortalRing = styled.div<{ delay?: number; size?: number }>`
  position: absolute;
  width: ${({ size = 100 }) => size}%;
  height: ${({ size = 100 }) => size}%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid;
  border-color: #ffd700 transparent #ffd700 transparent;
  border-radius: 50%;
  animation: ${portalSpin} ${({ delay = 3 }) => delay}s linear infinite;
  box-shadow:
    0 0 20px rgba(255, 215, 0, 0.5),
    inset 0 0 20px rgba(255, 215, 0, 0.3);
`;

const SearchingText = styled.div`
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 2rem;
  color: #ffd700;
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 30px rgba(255, 215, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: ${animations.pulse} 2s ease-in-out infinite;
`;

const QueueInfo = styled.div`
  position: absolute;
  bottom: -120px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  min-width: 300px;
`;

const QueueTime = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1.5rem;
  color: #faf8f6;
  margin-bottom: 8px;
`;

const QueueMode = styled.div`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PlayerCard = styled.div<{ side: 'left' | 'right'; visible?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ side }) => side}: ${({ visible }) => (visible ? '100px' : '-400px')};
  transform: translateY(-50%);
  width: 300px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const PlayerAvatar = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
  background: ${hearthstoneTheme.textures.gemstone.diamond};
  border: 4px solid #ffd700;
  border-radius: 50%;
  box-shadow:
    0 0 30px rgba(255, 215, 0, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  animation: ${animations.float} 3s ease-in-out infinite;
`;

const PlayerName = styled.div`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.5rem;
  color: #ffd700;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
`;

const PlayerRank = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1rem;
  color: #faf8f6;
  text-align: center;
  opacity: 0.9;
`;

const VersusText = styled.div<{ visible?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${({ visible }) => (visible ? 1 : 0)});
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 4rem;
  color: #ffd700;
  text-shadow:
    4px 4px 8px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(255, 215, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation: ${animations.glow} 2s ease-in-out infinite;
`;

const CancelButton = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
`;

const TipsContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  text-align: center;
  z-index: 10;
`;

const TipText = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1.1rem;
  color: #faf8f6;
  opacity: 0.8;
  font-style: italic;
`;

const MatchmakingPage: React.FC = () => {
  const navigate = useNavigate();
  const [queueTime, setQueueTime] = useState(0);
  const [matchFound, setMatchFound] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    'Tip: Always check your mana curve when building a deck!',
    'Tip: Board control is often more important than face damage.',
    'Tip: Save your removal spells for high-value targets.',
    "Tip: Don't forget to use your hero power when you have spare mana.",
    'Tip: Card advantage wins games - try to get 2-for-1 trades.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQueueTime((prev) => prev + 1);
    }, 1000);

    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);

    const matchTimer = setTimeout(() => {
      setMatchFound(true);
      setTimeout(() => {
        navigate('/game');
      }, 3000);
    }, 8000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
      clearTimeout(matchTimer);
    };
  }, [navigate, tips.length]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <MatchmakingContainer>
      <BackgroundEffect />

      <TipsContainer>
        <Panel variant="parchment" size="compact" bordered>
          <TipText>{tips[currentTip]}</TipText>
        </Panel>
      </TipsContainer>

      <PortalContainer>
        <Portal />
        <PortalRing size={110} delay={3} />
        <PortalRing size={125} delay={4} />
        <PortalRing size={140} delay={5} />

        {!matchFound && (
          <>
            <SearchingText>Searching...</SearchingText>
            <QueueInfo>
              <QueueTime>{formatTime(queueTime)}</QueueTime>
              <QueueMode>Ranked Match</QueueMode>
            </QueueInfo>
          </>
        )}
      </PortalContainer>

      <PlayerCard side="left" visible={matchFound}>
        <Panel variant="stone" size="compact" bordered glowing>
          <PlayerAvatar>👤</PlayerAvatar>
          <PlayerName>You</PlayerName>
          <PlayerRank>Rank 15 - Gold Division</PlayerRank>
        </Panel>
      </PlayerCard>

      <VersusText visible={matchFound}>VS</VersusText>

      <PlayerCard side="right" visible={matchFound}>
        <Panel variant="stone" size="compact" bordered glowing>
          <PlayerAvatar>🎭</PlayerAvatar>
          <PlayerName>Opponent</PlayerName>
          <PlayerRank>Rank 14 - Gold Division</PlayerRank>
        </Panel>
      </PlayerCard>

      {!matchFound && (
        <CancelButton>
          <Button variant="danger" size="large" onClick={() => navigate('/lobby')}>
            Cancel Search
          </Button>
        </CancelButton>
      )}

      {matchFound && (
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
          }}
        >
          <Panel variant="magical" size="compact" bordered glowing>
            <div
              style={{
                fontFamily: 'Belwe Bold, Georgia, serif',
                fontSize: '1.5rem',
                color: '#FFD700',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            >
              Match Found!
            </div>
            <div
              style={{
                fontFamily: 'Franklin Gothic, Arial, sans-serif',
                fontSize: '1rem',
                color: '#FAF8F6',
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              Entering battlefield...
            </div>
          </Panel>
        </div>
      )}
    </MatchmakingContainer>
  );
};

export default MatchmakingPage;
