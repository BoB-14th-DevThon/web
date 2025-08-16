import { UUID } from '@shared/types';
import { Card } from './Card';
import { Deck } from './Deck';

export class Player {
  public readonly id: UUID;
  public readonly name: string;
  public health: number;
  public maxHealth: number;
  public mana: number;
  public maxMana: number;
  public fatigueDamage: number;
  public deck: Deck;
  public hand: Card[];
  public board: Card[];

  constructor(data: {
    id: UUID;
    name: string;
    health?: number;
    maxHealth?: number;
    deck: Deck;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.health = data.health || 30;
    this.maxHealth = data.maxHealth || 30;
    this.mana = 0;
    this.maxMana = 0;
    this.fatigueDamage = 0;
    this.deck = data.deck;
    this.hand = [];
    this.board = [];
  }

  public drawCard(): Card | null {
    const card = this.deck.draw();
    
    if (!card) {
      // 덱이 비었을 때 피로 데미지
      this.fatigueDamage += 1;
      this.takeDamage(this.fatigueDamage);
      return null;
    }

    if (this.hand.length < 10) {
      this.hand.push(card);
      return card;
    }
    
    // 손패가 가득 찼을 때 카드 소각
    return null;
  }

  public playCard(cardId: UUID, _targetId?: UUID): boolean {
    const cardIndex = this.hand.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) return false;

    const card = this.hand[cardIndex];
    if (!card.canBePlayed(this.mana)) return false;

    this.mana -= card.cost;
    this.hand.splice(cardIndex, 1);

    if (card.isMinion() && this.board.length < 7) {
      this.board.push(card);
      return true;
    }

    return true;
  }

  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
  }

  public heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }

  public startTurn(): void {
    this.maxMana = Math.min(10, this.maxMana + 1);
    this.mana = this.maxMana;
    this.drawCard();
  }

  public isAlive(): boolean {
    return this.health > 0;
  }

  public getHandSize(): number {
    return this.hand.length;
  }

  public getBoardSize(): number {
    return this.board.length;
  }
}
