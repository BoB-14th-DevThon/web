import { UUID, CardType, CardRarity } from '@shared/types';

export interface CardAbility {
  id: string;
  name: string;
  description: string;
  trigger?: 'ON_PLAY' | 'ON_DEATH' | 'ON_DAMAGE' | 'ON_TURN_START' | 'ON_TURN_END';
}

export class Card {
  public readonly id: UUID;
  public readonly name: string;
  public readonly description: string;
  public readonly cost: number;
  public readonly type: CardType;
  public readonly rarity: CardRarity;
  public readonly attack?: number;
  public readonly health?: number;
  public readonly abilities: CardAbility[];
  public readonly imageUrl: string;

  constructor(data: {
    id: UUID;
    name: string;
    description: string;
    cost: number;
    type: CardType;
    rarity: CardRarity;
    attack?: number;
    health?: number;
    abilities?: CardAbility[];
    imageUrl: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.cost = data.cost;
    this.type = data.type;
    this.rarity = data.rarity;
    this.attack = data.attack;
    this.health = data.health;
    this.abilities = data.abilities || [];
    this.imageUrl = data.imageUrl;
  }

  public canBePlayed(currentMana: number): boolean {
    return currentMana >= this.cost;
  }

  public isMinion(): boolean {
    return this.type === CardType.MINION;
  }

  public isSpell(): boolean {
    return this.type === CardType.SPELL;
  }

  public hasAbility(abilityId: string): boolean {
    return this.abilities.some((ability) => ability.id === abilityId);
  }
}
