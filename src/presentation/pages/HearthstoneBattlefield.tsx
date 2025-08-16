import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import HearthstoneCard from '../components/game/HearthstoneCard';
import { Card as CardEntity } from '@domain/entities/Card';
import { sampleCards } from '@infrastructure/data/sampleCards';

const BattlefieldContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #000000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// 게임 보드 (중앙)
const GameBoard = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 60%;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%),
    linear-gradient(
      90deg,
      #8b4513 0%,
      #a0522d 10%,
      #8b4513 20%,
      #654321 30%,
      #8b4513 40%,
      #a0522d 50%,
      #8b4513 60%,
      #654321 70%,
      #8b4513 80%,
      #a0522d 90%,
      #8b4513 100%
    );
  border: 8px ridge #654321;
  border-radius: 20px;
  box-shadow:
    inset 0 0 50px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(0, 0, 0, 0.8);

  /* 나무 텍스처 효과 */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 20px,
      rgba(0, 0, 0, 0.1) 20px,
      rgba(0, 0, 0, 0.1) 21px
    );
    border-radius: 12px;
  }
`;

// 플레이어 영역
const PlayerSection = styled.div<{ isOpponent?: boolean }>`
  position: absolute;
  ${(props) => (props.isOpponent ? 'top: 0;' : 'bottom: 0;')}
  left: 0;
  right: 0;
  height: 20%;
  z-index: 2;
`;

// 카드를 들고 있는 손
const HandContainer = styled.div<{ isOpponent?: boolean }>`
  position: absolute;
  ${(props) => (props.isOpponent ? 'top: -50px;' : 'bottom: -50px;')}
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: -30px;
  z-index: 3;
`;

const HandCardWrapper = styled.div<{
  index: number;
  total: number;
  isHovered?: boolean;
  isDragging?: boolean;
}>`
  transform-origin: bottom center;
  transition: all 0.3s ease-out;
  cursor: grab;

  ${({ index, total, isHovered, isDragging }) => {
    const angle = (index - (total - 1) / 2) * 5;
    const yOffset = Math.abs(index - (total - 1) / 2) * 10;
    return css`
      transform: rotate(${angle}deg) translateY(${isHovered ? -30 : yOffset}px)
        scale(${isDragging ? 1.1 : isHovered ? 1.05 : 1});
      z-index: ${isDragging ? 1000 : isHovered ? 100 : index};
    `;
  }}

  &:active {
    cursor: grabbing;
  }
`;

// 히어로 초상화
const HeroPortrait = styled.div<{ isOpponent?: boolean }>`
  position: absolute;
  ${(props) => (props.isOpponent ? 'top: 20px;' : 'bottom: 20px;')}
  right: 100px;
  width: 120px;
  height: 150px;
`;

const HeroFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #8b6914, #daa520, #ffd700, #daa520, #8b6914);
  padding: 4px;
  border-radius: 60% 60% 50% 50% / 50% 50% 40% 40%;
  box-shadow:
    0 0 30px rgba(255, 215, 0, 0.6),
    inset 0 0 20px rgba(0, 0, 0, 0.3);
`;

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 30%, #4a90e2, #2c5aa0);
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 30%, transparent 30%, rgba(0, 0, 0, 0.4) 100%);
  }
`;

const HeroHealth = styled.div`
  position: absolute;
  bottom: -15px;
  right: -15px;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, #ff6b6b 0%, #dc143c 50%, #8b0000 100%);
  border: 3px solid #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.6rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  box-shadow:
    0 0 10px rgba(255, 0, 0, 0.6),
    inset 0 -2px 4px rgba(0, 0, 0, 0.4);
`;

// 히어로 파워 버튼
const HeroPowerButton = styled.button<{ isActive?: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 250px;
  width: 80px;
  height: 80px;
  background: ${(props) =>
    props.isActive
      ? 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'
      : 'radial-gradient(circle, #555 0%, #333 50%, #222 100%)'};
  border: 3px solid ${(props) => (props.isActive ? '#FFD700' : '#666')};
  border-radius: 50%;
  cursor: ${(props) => (props.isActive ? 'pointer' : 'not-allowed')};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow:
    0 0 20px ${(props) => (props.isActive ? 'rgba(255, 215, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)')},
    inset 0 -2px 4px rgba(0, 0, 0, 0.4);

  &:hover:not(:disabled) {
    transform: scale(1.1);
    box-shadow:
      0 0 30px ${(props) => (props.isActive ? 'rgba(255, 215, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)')},
      inset 0 -2px 4px rgba(0, 0, 0, 0.4);
  }
`;

// 마나 크리스탈
const ManaDisplay = styled.div`
  position: absolute;
  bottom: 20px;
  right: 350px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ManaCrystals = styled.div`
  display: flex;
  gap: 2px;
`;

const Crystal = styled.div<{ isFilled?: boolean; isUsed?: boolean }>`
  width: 25px;
  height: 32px;
  background: ${({ isFilled, isUsed }) =>
    isUsed
      ? 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
      : isFilled
        ? 'radial-gradient(ellipse at center, #4FC3F7 0%, #2196F3 40%, #1565C0 100%)'
        : 'linear-gradient(135deg, #2C5AA0 0%, #1A3A5C 100%)'};
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  box-shadow: ${({ isFilled }) => (isFilled ? '0 0 10px rgba(79, 195, 247, 0.6)' : 'none')};
  transition: all 0.3s;
`;

const ManaCounter = styled.div`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.5rem;
  color: #4fc3f7;
  text-shadow: 0 0 10px rgba(79, 195, 247, 0.6);
`;

// 턴 종료 버튼
const EndTurnButton = styled.button<{ isActive?: boolean }>`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: 60px;
  background: ${(props) =>
    props.isActive
      ? 'radial-gradient(ellipse at center, #7FFF00 0%, #32CD32 40%, #228B22 100%)'
      : 'radial-gradient(ellipse at center, #666 0%, #444 40%, #222 100%)'};
  border: 4px solid ${(props) => (props.isActive ? '#FFD700' : '#666')};
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.isActive ? '#FFFFFF' : '#999')};
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  box-shadow:
    0 0 30px ${(props) => (props.isActive ? 'rgba(127, 255, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)')},
    inset 0 -2px 4px rgba(0, 0, 0, 0.4);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow:
      0 0 40px ${(props) => (props.isActive ? 'rgba(127, 255, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)')},
      inset 0 -2px 4px rgba(0, 0, 0, 0.4);
  }
`;

// 미니언 영역
const MinionZone = styled.div<{ isOpponent?: boolean }>`
  position: absolute;
  ${(props) => (props.isOpponent ? 'top: 35%;' : 'bottom: 35%;')}
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 1;
`;

// 기록 패널
const HistoryPanel = styled.div`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  height: 300px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #8b6914;
  border-radius: 8px;
  padding: 15px;
  overflow-y: auto;
`;

const HearthstoneBattlefield: React.FC = () => {
  const [isYourTurn, setIsYourTurn] = useState(true);
  const [playerMana, setPlayerMana] = useState(5);
  const [playerMaxMana, setPlayerMaxMana] = useState(8);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);

  // 샘플 카드 데이터
  const playerHand = sampleCards.slice(0, 5).map((card) => new CardEntity(card));
  const playerMinions = sampleCards.slice(5, 8).map((card) => new CardEntity(card));
  const opponentMinions = sampleCards.slice(8, 10).map((card) => new CardEntity(card));

  const handleEndTurn = () => {
    setIsYourTurn(false);
    setTimeout(() => {
      setIsYourTurn(true);
      setPlayerMaxMana(Math.min(10, playerMaxMana + 1));
      setPlayerMana(playerMaxMana + 1);
    }, 2000);
  };

  return (
    <BattlefieldContainer>
      <GameBoard />

      {/* 상대방 영역 */}
      <PlayerSection isOpponent>
        <HeroPortrait isOpponent>
          <HeroFrame>
            <HeroImage>
              <span style={{ zIndex: 1 }}>👹</span>
            </HeroImage>
            <HeroHealth>30</HeroHealth>
          </HeroFrame>
        </HeroPortrait>
      </PlayerSection>

      {/* 상대방 미니언 */}
      <MinionZone isOpponent>
        {opponentMinions.map((minion) => (
          <HearthstoneCard key={minion.id} card={minion} size="small" />
        ))}
      </MinionZone>

      {/* 플레이어 미니언 */}
      <MinionZone>
        {playerMinions.map((minion) => (
          <HearthstoneCard
            key={minion.id}
            card={minion}
            size="small"
            isPlayable={minion.canBePlayed(playerMana)}
          />
        ))}
      </MinionZone>

      {/* 플레이어 영역 */}
      <PlayerSection>
        <HeroPortrait>
          <HeroFrame>
            <HeroImage>
              <span style={{ zIndex: 1 }}>🧙‍♀️</span>
            </HeroImage>
            <HeroHealth>30</HeroHealth>
          </HeroFrame>
        </HeroPortrait>

        <HeroPowerButton isActive={playerMana >= 2}>❄️</HeroPowerButton>

        <ManaDisplay>
          <ManaCounter>
            {playerMana}/{playerMaxMana}
          </ManaCounter>
          <ManaCrystals>
            {Array.from({ length: 10 }).map((_, index) => (
              <Crystal
                key={index}
                isFilled={index < playerMaxMana}
                isUsed={index >= playerMana && index < playerMaxMana}
              />
            ))}
          </ManaCrystals>
        </ManaDisplay>

        <HandContainer>
          {playerHand.map((card, index) => (
            <HandCardWrapper
              key={card.id}
              index={index}
              total={playerHand.length}
              isHovered={hoveredCard === card.id}
              isDragging={isDragging === card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseDown={() => setIsDragging(card.id)}
              onMouseUp={() => setIsDragging(null)}
            >
              <HearthstoneCard card={card} size="small" isPlayable={card.canBePlayed(playerMana)} />
            </HandCardWrapper>
          ))}
        </HandContainer>
      </PlayerSection>

      <EndTurnButton isActive={isYourTurn} onClick={handleEndTurn} disabled={!isYourTurn}>
        {isYourTurn ? '턴 종료' : '상대 턴'}
      </EndTurnButton>

      <HistoryPanel>
        <h3
          style={{
            color: '#FFD700',
            fontSize: '1rem',
            marginBottom: '10px',
            fontFamily: 'Belwe Bold, Franklin Gothic, Arial, serif',
          }}
        >
          기록
        </h3>
        <div style={{ color: '#FAF8F6', fontSize: '0.8rem' }}>
          <div>게임 시작!</div>
          <div>당신의 턴</div>
        </div>
      </HistoryPanel>
    </BattlefieldContainer>
  );
};

export default HearthstoneBattlefield;
