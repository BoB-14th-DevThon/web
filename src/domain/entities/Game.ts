import { UUID, GamePhase, PlayerAction } from '@shared/types';
import { Player } from './Player';

export interface GameAction {
  playerId: UUID;
  action: PlayerAction;
  cardId?: UUID;
  targetId?: UUID;
  timestamp: number;
}

export class Game {
  public readonly id: UUID;
  public readonly player1: Player;
  public readonly player2: Player;
  public phase: GamePhase;
  public currentPlayerId: UUID;
  public turnNumber: number;
  public actions: GameAction[];
  public winner?: UUID;
  public startedAt: number;
  public endedAt?: number;

  constructor(data: {
    id: UUID;
    player1: Player;
    player2: Player;
  }) {
    this.id = data.id;
    this.player1 = data.player1;
    this.player2 = data.player2;
    this.phase = GamePhase.WAITING;
    this.currentPlayerId = Math.random() > 0.5 ? data.player1.id : data.player2.id;
    this.turnNumber = 0;
    this.actions = [];
    this.startedAt = Date.now();
  }

  public getCurrentPlayer(): Player {
    return this.currentPlayerId === this.player1.id ? this.player1 : this.player2;
  }

  public getOpponentPlayer(): Player {
    return this.currentPlayerId === this.player1.id ? this.player2 : this.player1;
  }

  public startGame(): void {
    this.phase = GamePhase.MULLIGAN;
    this.turnNumber = 1;
    
    // 초기 카드 드로우
    for (let i = 0; i < 3; i++) {
      this.player1.drawCard();
      this.player2.drawCard();
    }
    
    // 후공 보너스 카드
    const secondPlayer = this.currentPlayerId === this.player1.id ? this.player2 : this.player1;
    secondPlayer.drawCard();
  }

  public startTurn(): void {
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.startTurn();
    this.phase = this.currentPlayerId === this.player1.id ? GamePhase.PLAYER_TURN : GamePhase.ENEMY_TURN;
  }

  public endTurn(): void {
    this.currentPlayerId = this.currentPlayerId === this.player1.id ? this.player2.id : this.player1.id;
    this.turnNumber++;
    this.startTurn();
  }

  public executeAction(action: GameAction): boolean {
    if (action.playerId !== this.currentPlayerId) return false;

    switch (action.action) {
      case PlayerAction.PLAY_CARD:
        return this.handlePlayCard(action);
      case PlayerAction.ATTACK:
        return this.handleAttack(action);
      case PlayerAction.END_TURN:
        this.endTurn();
        return true;
      case PlayerAction.CONCEDE:
        return this.handleConcede(action);
      default:
        return false;
    }
  }

  private handlePlayCard(action: GameAction): boolean {
    if (!action.cardId) return false;
    const player = this.getCurrentPlayer();
    return player.playCard(action.cardId, action.targetId);
  }

  private handleAttack(_action: GameAction): boolean {
    // 공격 로직 구현
    return true;
  }

  private handleConcede(action: GameAction): boolean {
    this.winner = action.playerId === this.player1.id ? this.player2.id : this.player1.id;
    this.phase = GamePhase.GAME_OVER;
    this.endedAt = Date.now();
    return true;
  }

  public checkWinCondition(): void {
    if (!this.player1.isAlive()) {
      this.winner = this.player2.id;
      this.phase = GamePhase.GAME_OVER;
      this.endedAt = Date.now();
    } else if (!this.player2.isAlive()) {
      this.winner = this.player1.id;
      this.phase = GamePhase.GAME_OVER;
      this.endedAt = Date.now();
    }
  }

  public isActive(): boolean {
    return this.phase !== GamePhase.GAME_OVER && this.phase !== GamePhase.WAITING;
  }

  public isOver(): boolean {
    return this.phase === GamePhase.GAME_OVER;
  }
}
