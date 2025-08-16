import { UUID } from '@shared/types';
import { Card } from './Card';

export class Deck {
  public readonly id: UUID;
  public readonly name: string;
  private cards: Card[];
  private originalCards: Card[];

  constructor(data: {
    id: UUID;
    name: string;
    cards: Card[];
  }) {
    this.id = data.id;
    this.name = data.name;
    this.originalCards = [...data.cards];
    this.cards = [...data.cards];
    this.shuffle();
  }

  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public draw(): Card | null {
    return this.cards.pop() || null;
  }

  public getRemaining(): number {
    return this.cards.length;
  }

  public peek(count: number): Card[] {
    return this.cards.slice(-count).reverse();
  }

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public reset(): void {
    this.cards = [...this.originalCards];
    this.shuffle();
  }

  public isEmpty(): boolean {
    return this.cards.length === 0;
  }
}
