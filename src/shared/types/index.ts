// 공통 타입 정의
export type UUID = string;
export type Timestamp = number;

// 게임 상태 관련 타입
export enum GamePhase {
  WAITING = 'WAITING',
  MULLIGAN = 'MULLIGAN',
  PLAYER_TURN = 'PLAYER_TURN',
  ENEMY_TURN = 'ENEMY_TURN',
  COMBAT = 'COMBAT',
  GAME_OVER = 'GAME_OVER',
}

export enum CardType {
  MINION = 'MINION',
  SPELL = 'SPELL',
  WEAPON = 'WEAPON',
  HERO = 'HERO',
}

export enum CardRarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
}

export enum PlayerAction {
  PLAY_CARD = 'PLAY_CARD',
  ATTACK = 'ATTACK',
  END_TURN = 'END_TURN',
  CONCEDE = 'CONCEDE',
  USE_HERO_POWER = 'USE_HERO_POWER',
}

// 에러 타입
export interface GameError {
  code: string;
  message: string;
  details?: unknown;
}

// 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: GameError;
}
