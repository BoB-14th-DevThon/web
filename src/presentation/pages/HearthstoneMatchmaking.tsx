import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import HearthstoneButton from '../components/ui/HearthstoneButton';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const vsGlow = keyframes`
  0%, 100% { 
    text-shadow: 
      0 0 20px rgba(255, 0, 0, 0.8),
      0 0 40px rgba(255, 0, 0, 0.6),
      0 0 60px rgba(255, 0, 0, 0.4);
    filter: brightness(1);
  }
  50% { 
    text-shadow: 
      0 0 30px rgba(255, 0, 0, 1),
      0 0 60px rgba(255, 0, 0, 0.8),
      0 0 90px rgba(255, 0, 0, 0.6);
    filter: brightness(1.2);
  }
`;

const MatchmakingContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  /* 배경 효과 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(20, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.95) 70%);
  }
`;

const MainContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  gap: 100px;
`;

const PlayerFrame = styled.div<{ side: 'left' | 'right' }>`
  position: relative;
  animation: ${(props) => (props.side === 'left' ? slideInLeft : slideInRight)} 0.8s ease-out;
`;

const PortraitFrame = styled.div`
  position: relative;
  width: 350px;
  height: 450px;
  background: linear-gradient(
    135deg,
    #8b6914 0%,
    #daa520 25%,
    #ffd700 50%,
    #daa520 75%,
    #8b6914 100%
  );
  padding: 8px;
  clip-path: polygon(
    20px 0%,
    calc(100% - 20px) 0%,
    100% 20px,
    100% calc(100% - 20px),
    calc(100% - 20px) 100%,
    20px 100%,
    0% calc(100% - 20px),
    0% 20px
  );
  box-shadow:
    0 0 40px rgba(255, 215, 0, 0.6),
    inset 0 0 20px rgba(0, 0, 0, 0.5);
`;

const PortraitInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  clip-path: polygon(
    18px 0%,
    calc(100% - 18px) 0%,
    100% 18px,
    100% calc(100% - 18px),
    calc(100% - 18px) 100%,
    18px 100%,
    0% calc(100% - 18px),
    0% 18px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const CharacterImage = styled.div`
  width: 90%;
  height: 90%;
  background: radial-gradient(
    circle at 50% 30%,
    rgba(100, 100, 200, 0.8) 0%,
    rgba(50, 50, 150, 0.6) 50%,
    rgba(20, 20, 80, 0.4) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  position: relative;

  /* 캐릭터 배경 효과 */
  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.8) 70%);
  }
`;

const PlayerNameplate = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, #2c1810 0%, #3d241a 50%, #2c1810 100%);
  border: 2px solid #8b6914;
  padding: 10px 40px;
  clip-path: polygon(
    10px 0%,
    calc(100% - 10px) 0%,
    100% 50%,
    calc(100% - 10px) 100%,
    10px 100%,
    0% 50%
  );
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
`;

const PlayerName = styled.div`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.4rem;
  color: #faf8f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const VersusContainer = styled.div`
  position: relative;
  animation: ${scaleIn} 0.5s ease-out 0.8s both;
`;

const VersusText = styled.div`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 6rem;
  color: #dc143c;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  animation: ${vsGlow} 2s ease-in-out infinite;
  transform: rotate(-5deg);
  position: relative;

  /* 3D 효과 */
  &::before {
    content: 'VS';
    position: absolute;
    left: 4px;
    top: 4px;
    color: rgba(0, 0, 0, 0.8);
    z-index: -1;
  }
`;

const BottomPanel = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: ${fadeIn} 1s ease-out 1.2s both;
`;

const MatchInfo = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #8b6914;
  padding: 15px 30px;
  border-radius: 4px;
  text-align: center;
`;

const MatchType = styled.div`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.2rem;
  color: #ffd700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 5px;
`;

const MatchStatus = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 1rem;
  color: #faf8f6;
`;

const HearthstoneMatchmaking: React.FC = () => {
  const navigate = useNavigate();
  const [matchFound, setMatchFound] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 2초 후 매치 찾음
    const matchTimer = setTimeout(() => {
      setMatchFound(true);
    }, 2000);

    return () => clearTimeout(matchTimer);
  }, []);

  useEffect(() => {
    if (matchFound) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            navigate('/battlefield');
            return prev;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [matchFound, navigate]);

  return (
    <MatchmakingContainer>
      <MainContent>
        <PlayerFrame side="left">
          <PortraitFrame>
            <PortraitInner>
              <CharacterImage>
                <span style={{ zIndex: 1 }}>🧙‍♀️</span>
              </CharacterImage>
            </PortraitInner>
          </PortraitFrame>
          <PlayerNameplate>
            <PlayerName>제이나 프라우드무어</PlayerName>
          </PlayerNameplate>
        </PlayerFrame>

        <VersusContainer>
          <VersusText>VS</VersusText>
        </VersusContainer>

        <PlayerFrame side="right">
          <PortraitFrame>
            <PortraitInner>
              <CharacterImage>
                <span style={{ zIndex: 1 }}>⚔️</span>
              </CharacterImage>
            </PortraitInner>
          </PortraitFrame>
          <PlayerNameplate>
            <PlayerName>{matchFound ? '안두인 린' : '???'}</PlayerName>
          </PlayerNameplate>
        </PlayerFrame>
      </MainContent>

      <BottomPanel>
        <MatchInfo>
          <MatchType>캐주얼 게임</MatchType>
          <MatchStatus>
            {matchFound ? `전투 시작까지 ${countdown}초...` : '상대를 찾는 중...'}
          </MatchStatus>
        </MatchInfo>

        {!matchFound && (
          <HearthstoneButton variant="cancel" size="medium" onClick={() => navigate('/lobby')}>
            취소
          </HearthstoneButton>
        )}
      </BottomPanel>
    </MatchmakingContainer>
  );
};

export default HearthstoneMatchmaking;
