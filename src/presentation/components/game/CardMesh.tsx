import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Card } from '@domain/entities';

interface CardMeshProps {
  card: Card;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isSelected?: boolean;
  isValidTarget?: boolean;
  canInteract?: boolean;
  onClick?: () => void;
}

export const CardMesh = ({ 
  card, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  isSelected = false,
  isValidTarget = false,
  canInteract = true,
  onClick 
}: CardMeshProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_state) => {
    if (!meshRef.current) return;
    
    // 호버 애니메이션
    if (hovered && canInteract) {
      meshRef.current.position.y += (0.3 - meshRef.current.position.y) * 0.1;
    } else {
      meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.1;
    }
    
    // 선택된 카드 애니메이션
    if (isSelected) {
      meshRef.current.rotation.z = Math.sin(_state.clock.elapsedTime * 3) * 0.05;
    } else {
      meshRef.current.rotation.z += (0 - meshRef.current.rotation.z) * 0.1;
    }
  });

  const getRarityColor = () => {
    switch (card.rarity) {
      case 'LEGENDARY': return '#ff8c00';
      case 'EPIC': return '#9370db';
      case 'RARE': return '#4682b4';
      default: return '#696969';
    }
  };

  const getCardColor = () => {
    if (isSelected) return '#ffd60a';
    if (isValidTarget) return '#ff006e';
    if (hovered && canInteract) return '#495057';
    return '#2d3436';
  };

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={canInteract ? onClick : undefined}
        onPointerOver={() => canInteract && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered && canInteract ? 1.05 : 1}
      >
        <boxGeometry args={[1.6, 2.2, 0.15]} />
        <meshStandardMaterial 
          color={getCardColor()}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* 카드 테두리 */}
      <mesh position={[0, 0, 0.051]}>
        <boxGeometry args={[1.4, 1.9, 0.01]} />
        <meshStandardMaterial color={getRarityColor()} />
      </mesh>

      {/* 카드 이름 */}
      <Text
        position={[0, 0.7, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {card.name}
      </Text>

      {/* 마나 비용 */}
      <mesh position={[-0.6, 0.8, 0.06]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#1e90ff" />
      </mesh>
      <Text
        position={[-0.6, 0.8, 0.07]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {card.cost}
      </Text>

      {/* 공격력/체력 (미니언인 경우) */}
      {card.isMinion() && (
        <>
          <mesh position={[-0.5, -0.8, 0.06]}>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#ff6347" />
          </mesh>
          <Text
            position={[-0.5, -0.8, 0.07]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {card.attack}
          </Text>

          <mesh position={[0.5, -0.8, 0.06]}>
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#32cd32" />
          </mesh>
          <Text
            position={[0.5, -0.8, 0.07]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {card.health}
          </Text>
        </>
      )}
    </group>
  );
};
