import { io, Socket } from 'socket.io-client';
import { store } from '@infrastructure/store';
import { 
  setGame, 
  updateGamePhase, 
  setError 
} from '@infrastructure/store/slices/gameSlice';
import { 
  setMatchmaking, 
  updateMatchmakingTime,
  addToast 
} from '@infrastructure/store/slices/uiSlice';
import { Game, Player, Card, Deck } from '@domain/entities';
import { GamePhase, UUID } from '@shared/types';

// Socket 이벤트 타입 정의
export interface ServerToClientEvents {
  // 연결 관련
  connect: () => void;
  disconnect: (reason: string) => void;
  error: (error: string) => void;

  // 매칭 관련
  matchmakingStarted: () => void;
  matchmakingCancelled: () => void;
  matchFound: (data: { gameId: UUID; opponentId: UUID; opponentName: string }) => void;
  matchmakingUpdate: (data: { queuePosition: number; estimatedTime: number }) => void;

  // 게임 상태
  gameState: (gameData: any) => void;
  gamePhaseChanged: (phase: GamePhase) => void;
  turnStarted: (playerId: UUID) => void;
  cardPlayed: (data: { playerId: UUID; cardId: UUID; targetId?: UUID }) => void;
  cardDrawn: (data: { playerId: UUID; cardData?: any }) => void;
  playerAttacked: (data: { attackerId: UUID; defenderId: UUID; damage: number }) => void;
  gameEnded: (data: { winnerId: UUID; reason: string }) => void;

  // 채팅 및 이모트
  chatMessage: (data: { playerId: UUID; message: string }) => void;
  emote: (data: { playerId: UUID; emoteId: string }) => void;
}

export interface ClientToServerEvents {
  // 매칭
  joinMatchmaking: (deckId: UUID) => void;
  cancelMatchmaking: () => void;

  // 게임 액션
  playCard: (data: { cardId: UUID; targetId?: UUID }) => void;
  attack: (data: { attackerId: UUID; targetId: UUID }) => void;
  endTurn: () => void;
  concede: () => void;
  useHeroPower: (targetId?: UUID) => void;
  mulligan: (cardIds: UUID[]) => void;

  // 채팅 및 이모트
  sendChat: (message: string) => void;
  sendEmote: (emoteId: string) => void;
}

export class SocketManager {
  private static instance: SocketManager;
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private matchmakingTimer: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public connect(token?: string): void {
    if (this.socket?.connected) return;

    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
    
    this.socket = io(socketUrl, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
      transports: ['websocket', 'polling'],
    });

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    // 연결 이벤트
    this.socket.on('connect', () => {
      console.log('Socket connected');
      store.dispatch(addToast({
        id: Date.now().toString(),
        message: '서버에 연결되었습니다',
        type: 'success',
        duration: 3000,
      }));
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      store.dispatch(addToast({
        id: Date.now().toString(),
        message: '서버와의 연결이 끊어졌습니다',
        type: 'error',
        duration: 5000,
      }));
      this.stopMatchmakingTimer();
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      store.dispatch(setError(error));
    });

    // 매칭 이벤트
    this.socket.on('matchmakingStarted', () => {
      store.dispatch(setMatchmaking(true));
      this.startMatchmakingTimer();
    });

    this.socket.on('matchmakingCancelled', () => {
      store.dispatch(setMatchmaking(false));
      this.stopMatchmakingTimer();
    });

    this.socket.on('matchFound', (data) => {
      store.dispatch(setMatchmaking(false));
      this.stopMatchmakingTimer();
      store.dispatch(addToast({
        id: Date.now().toString(),
        message: `상대를 찾았습니다: ${data.opponentName}`,
        type: 'success',
        duration: 3000,
      }));
      // 게임 페이지로 리다이렉트는 컴포넌트에서 처리
      window.location.href = `/game/${data.gameId}`;
    });

    this.socket.on('matchmakingUpdate', (data) => {
      // 매칭 큐 위치 업데이트
      console.log('Matchmaking update:', data);
    });

    // 게임 상태 이벤트
    this.socket.on('gameState', (gameData) => {
      const game = this.deserializeGame(gameData);
      store.dispatch(setGame(game));
    });

    this.socket.on('gamePhaseChanged', (phase) => {
      store.dispatch(updateGamePhase(phase));
    });

    this.socket.on('cardPlayed', (data) => {
      console.log('Card played:', data);
      // 카드 플레이 애니메이션 트리거
    });

    this.socket.on('gameEnded', (data) => {
      store.dispatch(addToast({
        id: Date.now().toString(),
        message: data.reason,
        type: 'info',
        duration: 10000,
      }));
    });
  }

  private startMatchmakingTimer(): void {
    let seconds = 0;
    this.matchmakingTimer = setInterval(() => {
      seconds++;
      store.dispatch(updateMatchmakingTime(seconds));
    }, 1000);
  }

  private stopMatchmakingTimer(): void {
    if (this.matchmakingTimer) {
      clearInterval(this.matchmakingTimer);
      this.matchmakingTimer = null;
      store.dispatch(updateMatchmakingTime(0));
    }
  }

  // 게임 데이터 역직렬화
  private deserializeGame(data: any): Game {
    // 카드 생성
    const createCard = (cardData: any) => new Card({
      id: cardData.id,
      name: cardData.name,
      description: cardData.description,
      cost: cardData.cost,
      type: cardData.type,
      rarity: cardData.rarity,
      attack: cardData.attack,
      health: cardData.health,
      abilities: cardData.abilities || [],
      imageUrl: cardData.imageUrl,
    });

    // 덱 생성
    const createDeck = (deckData: any) => new Deck({
      id: deckData.id,
      name: deckData.name,
      cards: deckData.cards.map(createCard),
    });

    // 플레이어 생성
    const createPlayer = (playerData: any) => {
      const player = new Player({
        id: playerData.id,
        name: playerData.name,
        health: playerData.health,
        maxHealth: playerData.maxHealth,
        deck: createDeck(playerData.deck),
      });
      
      player.mana = playerData.mana;
      player.maxMana = playerData.maxMana;
      player.hand = playerData.hand.map(createCard);
      player.board = playerData.board.map(createCard);
      
      return player;
    };

    // 게임 생성
    const game = new Game({
      id: data.id,
      player1: createPlayer(data.player1),
      player2: createPlayer(data.player2),
    });

    game.phase = data.phase;
    game.currentPlayerId = data.currentPlayerId;
    game.turnNumber = data.turnNumber;
    game.actions = data.actions;
    game.winner = data.winner;
    game.startedAt = data.startedAt;
    game.endedAt = data.endedAt;

    return game;
  }

  // 공개 메서드들
  public joinMatchmaking(deckId: UUID): void {
    this.emit('joinMatchmaking', deckId);
  }

  public cancelMatchmaking(): void {
    this.emit('cancelMatchmaking');
  }

  public playCard(cardId: UUID, targetId?: UUID): void {
    this.emit('playCard', { cardId, targetId });
  }

  public attack(attackerId: UUID, targetId: UUID): void {
    this.emit('attack', { attackerId, targetId });
  }

  public endTurn(): void {
    this.emit('endTurn');
  }

  public concede(): void {
    this.emit('concede');
  }

  public mulligan(cardIds: UUID[]): void {
    this.emit('mulligan', cardIds);
  }

  public sendEmote(emoteId: string): void {
    this.emit('sendEmote', emoteId);
  }

  private emit<K extends keyof ClientToServerEvents>(
    event: K,
    ...args: Parameters<ClientToServerEvents[K]>
  ): void {
    if (this.socket?.connected) {
      this.socket.emit(event, ...args);
    } else {
      console.error('Socket not connected');
      store.dispatch(setError('서버에 연결되어 있지 않습니다'));
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}
