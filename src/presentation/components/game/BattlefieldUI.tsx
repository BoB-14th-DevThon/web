import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { hearthstoneTheme, animations } from '../../../shared/theme/hearthstone';
import Button from '../ui/Button';
import { CardBadge } from '../ui/Card';

interface CardData {
  id: string;
  name: string;
  cost: number;
  attack: number;
  health: number;
  image?: string;
  description?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  canAttack?: boolean;
  isTargeted?: boolean;
}

interface PlayerData {
  name: string;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  armor: number;
  heropower?: string;
  deck: number;
  hand: number;
}

const BattlefieldContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    #0f2437 0%,
    #1a3650 30%,
    #2d5570 50%,
    #1a3650 70%,
    #0f2437 100%
  );
  position: relative;
  overflow: hidden;
`;

const BoardTexture = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(255, 215, 0, 0.02) 20px,
      rgba(255, 215, 0, 0.02) 40px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      rgba(255, 215, 0, 0.02) 20px,
      rgba(255, 215, 0, 0.02) 40px
    );
  pointer-events: none;
`;

const PlayerArea = styled.div<{ isOpponent?: boolean }>`
  height: 250px;
  display: flex;
  flex-direction: ${({ isOpponent }) => (isOpponent ? 'column-reverse' : 'column')};
  padding: 16px;
  position: relative;
  background: ${({ isOpponent }) =>
    isOpponent
      ? 'linear-gradient(180deg, rgba(139, 0, 0, 0.1) 0%, transparent 100%)'
      : 'linear-gradient(180deg, transparent 0%, rgba(0, 100, 0, 0.1) 100%)'};
`;

const HandArea = styled.div<{ isOpponent?: boolean }>`
  display: flex;
  justify-content: center;
  gap: -20px;
  padding: 8px;
  min-height: 140px;
  position: relative;
  transform: ${({ isOpponent }) =>
    isOpponent ? 'perspective(800px) rotateX(-10deg)' : 'perspective(800px) rotateX(10deg)'};
`;

const HandCard = styled.div<{
  index: number;
  total: number;
  isOpponent?: boolean;
  isHovered?: boolean;
}>`
  width: 100px;
  height: 140px;
  background: ${({ isOpponent }) =>
    isOpponent
      ? hearthstoneTheme.textures.leather
      : 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'};
  border: 2px solid #ffd700;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: ${({ isOpponent }) => (isOpponent ? 'default' : 'pointer')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform-origin: bottom center;
  transform: ${({ index, total, isHovered }) => {
    const angle = (index - (total - 1) / 2) * 5;
    const yOffset = Math.abs(index - (total - 1) / 2) * 5;
    return `
      rotate(${angle}deg)
      translateY(${isHovered ? -30 : yOffset}px)
      scale(${isHovered ? 1.1 : 1})
    `;
  }};
  z-index: ${({ isHovered, index }) => (isHovered ? 100 : index)};

  &:hover:not([data-opponent='true']) {
    z-index: 100;
  }

  ${({ isOpponent }) =>
    !isOpponent &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.3) 0%,
          transparent 50%,
          rgba(255, 255, 255, 0.1) 100%
        );
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
        border-radius: 6px;
      }

      &:hover::before {
        opacity: 1;
      }
    `}
`;

const MinionsArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 24px;
  position: relative;
  min-height: 200px;
`;

const MinionCard = styled.div<{ canAttack?: boolean; isTargeted?: boolean }>`
  width: 120px;
  height: 160px;
  background: ${hearthstoneTheme.textures.stone};
  border: 3px solid
    ${({ canAttack, isTargeted }) => (isTargeted ? '#FF0000' : canAttack ? '#00FF00' : '#FFD700')};
  border-radius: 8px;
  padding: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: ${({ canAttack }) =>
    canAttack ? '0 0 20px rgba(0, 255, 0, 0.5)' : '0 4px 8px rgba(0, 0, 0, 0.3)'};

  &:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }

  ${({ canAttack }) =>
    canAttack &&
    css`
      animation: ${animations.pulse} 2s ease-in-out infinite;

      &::before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: radial-gradient(circle, rgba(0, 255, 0, 0.3) 0%, transparent 70%);
        animation: ${animations.rotate} 3s linear infinite;
      }
    `}
`;

const MinionImage = styled.div`
  width: 100%;
  height: 80px;
  background: ${hearthstoneTheme.textures.gemstone.sapphire};
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const MinionName = styled.div`
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 0.8rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 4px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const MinionStats = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: -10px;
  left: 10px;
  right: 10px;
`;

const HeroPortrait = styled.div<{ isOpponent?: boolean }>`
  position: absolute;
  ${({ isOpponent }) => (isOpponent ? 'top: 16px' : 'bottom: 16px')};
  right: 16px;
  width: 150px;
  height: 180px;
  background: ${hearthstoneTheme.textures.gemstone.diamond};
  border: 4px solid #ffd700;
  border-radius: 50% 50% 60% 60% / 60% 60% 40% 40%;
  box-shadow:
    0 0 30px rgba(255, 215, 0, 0.5),
    inset 0 0 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow:
      0 0 40px rgba(255, 215, 0, 0.7),
      inset 0 0 20px rgba(0, 0, 0, 0.3);
  }
`;

const HeroHealth = styled.div`
  position: absolute;
  bottom: -15px;
  right: -10px;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, #ff6b6b 0%, #dc143c 100%);
  border: 3px solid #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const HeroArmor = styled.div`
  position: absolute;
  bottom: -15px;
  left: -10px;
  width: 50px;
  height: 50px;
  background: ${hearthstoneTheme.textures.metal};
  border: 3px solid #c0c0c0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ManaBar = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  gap: 4px;
`;

const ManaCrystal = styled.div<{ filled?: boolean; used?: boolean }>`
  width: 30px;
  height: 40px;
  background: ${({ filled, used }) =>
    used
      ? 'radial-gradient(ellipse, #2C5AA0 0%, #1A3A5C 100%)'
      : filled
        ? 'radial-gradient(ellipse, #4FC3F7 0%, #2196F3 100%)'
        : 'radial-gradient(ellipse, #1A3A5C 0%, #0D1F2D 100%)'};
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  border: 1px solid ${({ filled }) => (filled ? '#4FC3F7' : '#2C5AA0')};
  box-shadow: ${({ filled }) =>
    filled ? '0 0 10px rgba(79, 195, 247, 0.6)' : 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'};
  transition: all 0.3s;
`;

const EndTurnButton = styled.div`
  position: absolute;
  right: 50%;
  bottom: 280px;
  transform: translateX(50%);
`;

const TurnIndicator = styled.div<{ isYourTurn?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 24px;
  background: ${({ isYourTurn }) =>
    isYourTurn
      ? 'linear-gradient(135deg, #00FF00 0%, #00AA00 100%)'
      : 'linear-gradient(135deg, #FF0000 0%, #AA0000 100%)'};
  border: 3px solid #ffd700;
  border-radius: 8px;
  font-family: 'Belwe Bold', Georgia, serif;
  font-size: 1.2rem;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 50;
  animation: ${animations.pulse} 2s ease-in-out infinite;
`;

const BattlefieldUI: React.FC = () => {
  const [, setSelectedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isYourTurn, setIsYourTurn] = useState(true);

  const playerData: PlayerData = {
    name: 'You',
    health: 27,
    maxHealth: 30,
    mana: 5,
    maxMana: 8,
    armor: 2,
    deck: 15,
    hand: 5,
  };

  const opponentData: PlayerData = {
    name: 'Opponent',
    health: 24,
    maxHealth: 30,
    mana: 3,
    maxMana: 8,
    armor: 0,
    deck: 12,
    hand: 6,
  };

  const playerMinions: CardData[] = [
    { id: '1', name: 'Fire Elemental', cost: 6, attack: 6, health: 5, canAttack: true },
    { id: '2', name: 'Water Spirit', cost: 3, attack: 3, health: 4 },
    { id: '3', name: 'Earth Golem', cost: 5, attack: 4, health: 7 },
  ];

  const opponentMinions: CardData[] = [
    { id: '4', name: 'Shadow Beast', cost: 4, attack: 5, health: 3 },
    { id: '5', name: 'Frost Wyrm', cost: 7, attack: 7, health: 6 },
  ];

  return (
    <BattlefieldContainer>
      <BoardTexture />

      {/* Opponent Area */}
      <PlayerArea isOpponent>
        <HandArea isOpponent>
          {Array.from({ length: opponentData.hand }).map((_, index) => (
            <HandCard
              key={index}
              index={index}
              total={opponentData.hand}
              isOpponent
              data-opponent="true"
            />
          ))}
        </HandArea>

        <HeroPortrait isOpponent>
          <div style={{ fontSize: '3rem' }}>🎭</div>
          <HeroHealth>{opponentData.health}</HeroHealth>
          {opponentData.armor > 0 && <HeroArmor>{opponentData.armor}</HeroArmor>}
        </HeroPortrait>

        <ManaBar>
          {Array.from({ length: opponentData.maxMana }).map((_, index) => (
            <ManaCrystal key={index} filled={index < opponentData.mana} used={false} />
          ))}
        </ManaBar>
      </PlayerArea>

      {/* Battlefield */}
      <MinionsArea>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          {opponentMinions.map((minion) => (
            <MinionCard key={minion.id}>
              <MinionImage>⚔️</MinionImage>
              <MinionName>{minion.name}</MinionName>
              <MinionStats>
                <CardBadge type="attack">{minion.attack}</CardBadge>
                <CardBadge type="health">{minion.health}</CardBadge>
              </MinionStats>
            </MinionCard>
          ))}
        </div>
      </MinionsArea>

      <TurnIndicator isYourTurn={isYourTurn}>
        {isYourTurn ? 'Your Turn' : "Opponent's Turn"}
      </TurnIndicator>

      <MinionsArea>
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          {playerMinions.map((minion) => (
            <MinionCard
              key={minion.id}
              canAttack={minion.canAttack}
              onClick={() => setSelectedCard(minion.id)}
            >
              <MinionImage>🛡️</MinionImage>
              <MinionName>{minion.name}</MinionName>
              <MinionStats>
                <CardBadge type="attack">{minion.attack}</CardBadge>
                <CardBadge type="health">{minion.health}</CardBadge>
              </MinionStats>
            </MinionCard>
          ))}
        </div>
      </MinionsArea>

      {/* Player Area */}
      <PlayerArea>
        <HandArea>
          {Array.from({ length: playerData.hand }).map((_, index) => (
            <HandCard
              key={index}
              index={index}
              total={playerData.hand}
              isHovered={hoveredCard === `hand-${index}`}
              onMouseEnter={() => setHoveredCard(`hand-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </HandArea>

        <HeroPortrait>
          <div style={{ fontSize: '3rem' }}>👤</div>
          <HeroHealth>{playerData.health}</HeroHealth>
          {playerData.armor > 0 && <HeroArmor>{playerData.armor}</HeroArmor>}
        </HeroPortrait>

        <ManaBar>
          {Array.from({ length: playerData.maxMana }).map((_, index) => (
            <ManaCrystal
              key={index}
              filled={index < playerData.mana}
              used={
                index >= playerData.mana &&
                index < playerData.maxMana - (playerData.maxMana - playerData.mana)
              }
            />
          ))}
        </ManaBar>
      </PlayerArea>

      <EndTurnButton>
        <Button
          variant="primary"
          size="large"
          glowing={isYourTurn}
          onClick={() => setIsYourTurn(!isYourTurn)}
        >
          End Turn
        </Button>
      </EndTurnButton>
    </BattlefieldContainer>
  );
};

export default BattlefieldUI;
