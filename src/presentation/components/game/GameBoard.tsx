import { useRef } from 'react';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { Game, Card } from '@domain/entities';
import { UUID } from '@shared/types';
import { CardMesh } from './CardMesh';
import { Text } from '@react-three/drei';

interface GameBoardProps {
  game: Game;
  selectedCard: Card | null;
  validTargets: UUID[];
  onCardClick: (card: Card | null) => void;
  onCardPlay: (cardId: UUID, targetId?: UUID) => void;
  onAttack: (attackerId: UUID, targetId: UUID) => void;
}

export const GameBoard = ({ 
  game, 
  selectedCard, 
  validTargets, 
  onCardClick, 
  onCardPlay, 
  onAttack: _onAttack 
}: GameBoardProps) => {
  const boardRef = useRef<Group>(null);

  // 보드 애니메이션
  useFrame((state) => {
    if (boardRef.current) {
      boardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.005;
    }
  });

  const isValidTarget = (targetId: UUID) => validTargets.includes(targetId);

  const handleCardClick = (card: Card) => {
    if (selectedCard?.id === card.id) {
      onCardClick(null); // 선택 해제
    } else {
      onCardClick(card);
    }
  };

  const handleTargetClick = (targetId: UUID) => {
    if (selectedCard && isValidTarget(targetId)) {
      onCardPlay(selectedCard.id, targetId);
    }
  };

  return (
    <group ref={boardRef}>
      {/* 게임 보드 바닥 */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* 보드 테두리 */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[24.5, 0.1, 16.5]} />
        <meshStandardMaterial color="#16213e" />
      </mesh>

      {/* 플레이어 영역 구분선 */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[24, 0.05, 0.2]} />
        <meshStandardMaterial 
          color="#0f3460" 
          emissive="#0f3460"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* 마나 크리스탈 표시 */}
      <group position={[-10, 0.5, 6]}>
        {Array.from({ length: game.player1.maxMana }).map((_, i) => (
          <mesh key={`mana1-${i}`} position={[i * 0.8, 0, 0]}>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial 
              color={i < game.player1.mana ? "#00b4d8" : "#495057"}
              emissive={i < game.player1.mana ? "#00b4d8" : "#000000"}
              emissiveIntensity={i < game.player1.mana ? 0.5 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* 플레이어 1 (아래쪽) 보드 카드 */}
      <group position={[0, 0.5, 3]}>
        {game.player1.board.map((card, index) => {
          const xPos = (index - game.player1.board.length / 2 + 0.5) * 2.2;
          return (
            <CardMesh
              key={card.id}
              card={card}
              position={[xPos, 0, 0]}
              isSelected={selectedCard?.id === card.id}
              isValidTarget={isValidTarget(card.id)}
              onClick={() => handleCardClick(card)}
              canInteract={true}
            />
          );
        })}
      </group>

      {/* 플레이어 2 (위쪽) 보드 카드 */}
      <group position={[0, 0.5, -3]}>
        {game.player2.board.map((card, index) => {
          const xPos = (index - game.player2.board.length / 2 + 0.5) * 2.2;
          return (
            <CardMesh
              key={card.id}
              card={card}
              position={[xPos, 0, 0]}
              isValidTarget={isValidTarget(card.id)}
              onClick={() => handleTargetClick(card.id)}
              canInteract={false}
            />
          );
        })}
      </group>

      {/* 플레이어 손패 표시 영역 */}
      <group position={[0, 0.5, 7]}>
        {game.player1.hand.map((card, index) => {
          const handSize = game.player1.hand.length;
          const xPos = (index - handSize / 2 + 0.5) * 1.5;
          const yRotation = (index - handSize / 2 + 0.5) * 0.1;
          
          return (
            <CardMesh
              key={card.id}
              card={card}
              position={[xPos, Math.abs(xPos) * 0.05, 0]}
              rotation={[0.3, yRotation, 0]}
              isSelected={selectedCard?.id === card.id}
              onClick={() => handleCardClick(card)}
              canInteract={true}
              scale={0.9}
            />
          );
        })}
      </group>

      {/* 턴 표시기 */}
      <Text
        position={[0, 0.1, game.currentPlayerId === game.player1.id ? 1 : -1]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="#ffd60a"
        anchorX="center"
        anchorY="middle"
      >
        현재 턴
      </Text>
    </group>
  );
};
