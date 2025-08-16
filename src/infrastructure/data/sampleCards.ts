import { Card, CardAbility } from '@domain/entities';
import { CardType, CardRarity } from '@shared/types';

// 샘플 카드 능력
const abilities: Record<string, CardAbility> = {
  taunt: {
    id: 'taunt',
    name: '도발',
    description: '적은 이 하수인을 먼저 공격해야 합니다.',
  },
  divineShield: {
    id: 'divine-shield',
    name: '천상의 보호막',
    description: '첫 번째 피해를 무시합니다.',
  },
  charge: {
    id: 'charge',
    name: '돌진',
    description: '소환된 턴에 바로 공격할 수 있습니다.',
  },
  battlecry: {
    id: 'battlecry',
    name: '전투의 함성',
    description: '이 하수인을 낼 때 효과가 발동됩니다.',
    trigger: 'ON_PLAY',
  },
  deathrattle: {
    id: 'deathrattle',
    name: '죽음의 메아리',
    description: '이 하수인이 죽을 때 효과가 발동됩니다.',
    trigger: 'ON_DEATH',
  },
};

// 샘플 카드 데이터
export const sampleCards: Card[] = [
  // 일반 하수인
  new Card({
    id: 'card-001',
    name: '엘프 궁수',
    description: '전투의 함성: 원하는 대상에게 피해를 1 줍니다.',
    cost: 1,
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
    attack: 1,
    health: 1,
    abilities: [abilities.battlecry],
    imageUrl: '/cards/elf-archer.jpg',
  }),
  new Card({
    id: 'card-002',
    name: '무쇠껍질 방패병',
    description: '도발',
    cost: 2,
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
    attack: 1,
    health: 4,
    abilities: [abilities.taunt],
    imageUrl: '/cards/ironhide-shieldbearer.jpg',
  }),
  new Card({
    id: 'card-003',
    name: '늑대기수',
    description: '돌진',
    cost: 3,
    type: CardType.MINION,
    rarity: CardRarity.COMMON,
    attack: 3,
    health: 1,
    abilities: [abilities.charge],
    imageUrl: '/cards/wolf-rider.jpg',
  }),
  new Card({
    id: 'card-004',
    name: '빛의 수호자',
    description: '천상의 보호막',
    cost: 4,
    type: CardType.MINION,
    rarity: CardRarity.RARE,
    attack: 4,
    health: 4,
    abilities: [abilities.divineShield],
    imageUrl: '/cards/light-guardian.jpg',
  }),
  new Card({
    id: 'card-005',
    name: '불꽃 거인',
    description: '이 하수인은 강력한 불꽃의 힘을 지니고 있습니다.',
    cost: 6,
    type: CardType.MINION,
    rarity: CardRarity.EPIC,
    attack: 6,
    health: 6,
    abilities: [],
    imageUrl: '/cards/flame-giant.jpg',
  }),
  new Card({
    id: 'card-006',
    name: '용의 군주',
    description: '전투의 함성: 무작위 용족을 손으로 가져옵니다. 죽음의 메아리: 모든 아군에게 +1/+1',
    cost: 8,
    type: CardType.MINION,
    rarity: CardRarity.LEGENDARY,
    attack: 8,
    health: 8,
    abilities: [abilities.battlecry, abilities.deathrattle],
    imageUrl: '/cards/dragon-lord.jpg',
  }),
  
  // 주문 카드
  new Card({
    id: 'spell-001',
    name: '화염구',
    description: '원하는 대상에게 피해를 6 줍니다.',
    cost: 4,
    type: CardType.SPELL,
    rarity: CardRarity.COMMON,
    abilities: [],
    imageUrl: '/cards/fireball.jpg',
  }),
  new Card({
    id: 'spell-002',
    name: '서리 화살',
    description: '원하는 캐릭터에게 피해를 3 주고 빙결시킵니다.',
    cost: 2,
    type: CardType.SPELL,
    rarity: CardRarity.COMMON,
    abilities: [],
    imageUrl: '/cards/frostbolt.jpg',
  }),
  new Card({
    id: 'spell-003',
    name: '신성한 빛',
    description: '아군 하수인의 생명력을 6 회복시킵니다.',
    cost: 2,
    type: CardType.SPELL,
    rarity: CardRarity.COMMON,
    abilities: [],
    imageUrl: '/cards/holy-light.jpg',
  }),
  new Card({
    id: 'spell-004',
    name: '번개 폭풍',
    description: '모든 적 하수인에게 피해를 3 줍니다.',
    cost: 5,
    type: CardType.SPELL,
    rarity: CardRarity.RARE,
    abilities: [],
    imageUrl: '/cards/lightning-storm.jpg',
  }),
];

// 기본 덱 생성 함수
export const createStarterDeck = (): Card[] => {
  const deck: Card[] = [];
  
  // 각 카드를 2장씩 추가 (전설 카드는 1장만)
  sampleCards.forEach(card => {
    const copies = card.rarity === CardRarity.LEGENDARY ? 1 : 2;
    for (let i = 0; i < copies; i++) {
      deck.push(new Card({
        ...card,
        id: `${card.id}-copy-${i}`,
      }));
    }
  });
  
  // 30장이 될 때까지 기본 카드 추가
  while (deck.length < 30) {
    const basicCard = new Card({
      id: `basic-${deck.length}`,
      name: '견습 기사',
      description: '기본 하수인',
      cost: 2,
      type: CardType.MINION,
      rarity: CardRarity.COMMON,
      attack: 2,
      health: 3,
      abilities: [],
      imageUrl: '/cards/apprentice-knight.jpg',
    });
    deck.push(basicCard);
  }
  
  return deck;
};
