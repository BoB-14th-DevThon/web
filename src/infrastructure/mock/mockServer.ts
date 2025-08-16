import { Game, Player, Deck } from '@domain/entities';
import { createStarterDeck } from '@infrastructure/data/sampleCards';
import { GamePhase, PlayerAction } from '@shared/types';

// Mock 서버 - 실제 서버가 없을 때 로컬 테스트용
export class MockGameServer {
  private static instance: MockGameServer;
  private games: Map<string, Game> = new Map();
  private matchmakingQueue: string[] = [];

  private constructor() {}

  public static getInstance(): MockGameServer {
    if (!MockGameServer.instance) {
      MockGameServer.instance = new MockGameServer();
    }
    return MockGameServer.instance;
  }

  public joinMatchmaking(playerId: string): Promise<{ gameId: string; opponentId: string }> {
    return new Promise((resolve) => {
      this.matchmakingQueue.push(playerId);

      // 매칭 큐에 2명이 되면 게임 생성
      if (this.matchmakingQueue.length >= 2) {
        const player1Id = this.matchmakingQueue.shift()!;
        const player2Id = this.matchmakingQueue.shift()!;
        
        const game = this.createGame(player1Id, player2Id);
        
        // 두 플레이어에게 게임 정보 전달
        setTimeout(() => {
          resolve({
            gameId: game.id,
            opponentId: player1Id === playerId ? player2Id : player1Id,
          });
        }, 1000); // 1초 후 매칭 완료
      } else {
        // AI와 매칭 (5초 후)
        setTimeout(() => {
          const aiId = 'ai-player';
          const game = this.createGame(playerId, aiId);
          
          resolve({
            gameId: game.id,
            opponentId: aiId,
          });
        }, 5000);
      }
    });
  }

  public cancelMatchmaking(playerId: string): void {
    this.matchmakingQueue = this.matchmakingQueue.filter(id => id !== playerId);
  }

  private createGame(player1Id: string, player2Id: string): Game {
    const gameId = `game-${Date.now()}`;
    
    // 플레이어 생성
    const player1Deck = new Deck({
      id: `deck-${player1Id}`,
      name: '기본 덱',
      cards: createStarterDeck(),
    });
    
    const player2Deck = new Deck({
      id: `deck-${player2Id}`,
      name: '기본 덱',
      cards: createStarterDeck(),
    });
    
    const player1 = new Player({
      id: player1Id,
      name: player1Id === 'ai-player' ? 'AI 상대' : '플레이어 1',
      deck: player1Deck,
    });
    
    const player2 = new Player({
      id: player2Id,
      name: player2Id === 'ai-player' ? 'AI 상대' : '플레이어 2',
      deck: player2Deck,
    });
    
    const game = new Game({
      id: gameId,
      player1,
      player2,
    });
    
    // 게임 시작
    game.startGame();
    game.phase = GamePhase.PLAYER_TURN;
    
    this.games.set(gameId, game);
    
    // AI 플레이어인 경우 자동 플레이
    if (player2Id === 'ai-player') {
      this.startAIPlayer(game);
    }
    
    return game;
  }

  public getGame(gameId: string): Game | undefined {
    return this.games.get(gameId);
  }

  public playCard(gameId: string, playerId: string, cardId: string, targetId?: string): boolean {
    const game = this.games.get(gameId);
    if (!game) return false;
    
    const action = {
      playerId,
      action: PlayerAction.PLAY_CARD,
      cardId,
      targetId,
      timestamp: Date.now(),
    };
    
    return game.executeAction(action);
  }

  public endTurn(gameId: string, playerId: string): boolean {
    const game = this.games.get(gameId);
    if (!game) return false;
    
    const action = {
      playerId,
      action: PlayerAction.END_TURN,
      timestamp: Date.now(),
    };
    
    const result = game.executeAction(action);
    
    // AI 턴 시작
    if (result && game.currentPlayerId === 'ai-player') {
      setTimeout(() => this.playAITurn(game), 2000);
    }
    
    return result;
  }

  private startAIPlayer(game: Game): void {
    if (game.currentPlayerId === 'ai-player') {
      setTimeout(() => this.playAITurn(game), 3000);
    }
  }

  private playAITurn(game: Game): void {
    if (game.isOver() || game.currentPlayerId !== 'ai-player') return;
    
    const aiPlayer = game.player2;
    
    // 간단한 AI 로직
    // 1. 낼 수 있는 카드 확인
    const playableCards = aiPlayer.hand.filter(card => card.canBePlayed(aiPlayer.mana));
    
    // 2. 무작위로 카드 플레이
    if (playableCards.length > 0) {
      const randomCard = playableCards[Math.floor(Math.random() * playableCards.length)];
      this.playCard(game.id, 'ai-player', randomCard.id);
      
      // 추가 카드 플레이 시도
      setTimeout(() => {
        if (game.currentPlayerId === 'ai-player') {
          this.playAITurn(game);
        }
      }, 1500);
    } else {
      // 3. 턴 종료
      this.endTurn(game.id, 'ai-player');
    }
  }
}
