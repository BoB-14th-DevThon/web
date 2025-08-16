import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useGame } from '@presentation/hooks';
import { GameBoard } from '@presentation/components/game/GameBoard';
import { GameUI } from '@presentation/components/game/GameUI';
import { Suspense } from 'react';

export const GamePage = () => {
  const { game, selectedCard, validTargets, isMyTurn, actions } = useGame();

  if (!game) {
    return (
      <div className="loading-screen">
        <h2>게임을 불러오는 중...</h2>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="game-page">
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 10, 10]} fov={60} />
        
        <Suspense fallback={null}>
          {/* 조명 설정 */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 15, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-10, 5, -5]} intensity={0.5} color="#ff6b6b" />
          <pointLight position={[10, 5, -5]} intensity={0.5} color="#4ecdc4" />
          
          {/* 환경 조명 */}
          <Environment preset="sunset" />
          
          {/* 게임 보드 */}
          <GameBoard 
            game={game} 
            selectedCard={selectedCard}
            validTargets={validTargets}
            onCardClick={actions.selectCard}
            onCardPlay={actions.playCard}
            onAttack={actions.attack}
          />
          
          {/* 카메라 컨트롤 */}
          <OrbitControls
            enableRotate={false}
            enablePan={false}
            minDistance={8}
            maxDistance={15}
            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
      
      <GameUI 
        game={game} 
        isMyTurn={isMyTurn}
        onEndTurn={actions.endTurn}
        onConcede={actions.concede}
        onEmote={actions.sendEmote}
      />
    </div>
  );
};
