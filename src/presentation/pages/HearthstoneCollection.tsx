import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import HearthstoneButton from '../components/ui/HearthstoneButton';
import HearthstonePanel from '../components/ui/HearthstonePanel';
import HearthstoneCard from '../components/game/HearthstoneCard';
import { Card as CardEntity } from '@domain/entities/Card';
import { sampleCards } from '@infrastructure/data/sampleCards';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const CollectionContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(30, 20, 10, 0.6) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(10, 20, 30, 0.6) 0%, transparent 50%);
  }
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 2px solid #8b6914;
  display: flex;
  align-items: center;
  padding: 0 30px;
  z-index: 10;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 2.5rem;
  color: #ffd700;
  text-transform: uppercase;
  text-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 215, 0, 0.4);
  margin: 0;
`;

const BackButton = styled(HearthstoneButton)`
  position: absolute;
  right: 30px;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 80px;
`;

const CollectionSection = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  animation: ${fadeIn} 0.6s ease-out 0.2s both;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid #8b6914;
  border-radius: 8px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 10px 20px;
  background: ${(props) =>
    props.active
      ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
      : 'linear-gradient(135deg, #3D241A 0%, #2C1810 100%)'};
  border: 2px solid ${(props) => (props.active ? '#FFD700' : '#8B6914')};
  border-radius: 4px;
  color: ${(props) => (props.active ? '#1A1A1A' : '#FAF8F6')};
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    border-color: #ffd700;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #3d241a;
  border-radius: 8px;
  min-height: 600px;
`;

const DeckSection = styled.div`
  width: 350px;
  background: rgba(0, 0, 0, 0.8);
  border-left: 2px solid #8b6914;
  padding: 30px 20px;
  animation: ${fadeIn} 0.6s ease-out 0.4s both;
`;

const DeckHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const DeckTitle = styled.h2`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.8rem;
  color: #ffd700;
  margin: 0 0 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const DeckInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const DeckStat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 1.5rem;
  color: #ffd700;
`;

const StatLabel = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
`;

const DeckList = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 350px);
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b6914;
    border-radius: 4px;
  }
`;

const DeckCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 4px;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #3d241a;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(139, 105, 20, 0.3);
    border-color: #8b6914;
    transform: translateX(-5px);
  }
`;

const DeckCardName = styled.div`
  font-family: 'Franklin Gothic', Arial, sans-serif;
  color: #faf8f6;
  flex: 1;
`;

const DeckCardCost = styled.div`
  width: 25px;
  height: 25px;
  background: radial-gradient(circle, #4fc3f7 0%, #2196f3 40%, #1565c0 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Belwe Bold', 'Franklin Gothic', Arial, serif;
  font-size: 0.9rem;
  color: #ffffff;
  font-weight: bold;
  margin-right: 10px;
`;

const DeckActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageDot = styled.button<{ active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#FFD700' : '#3D241A')};
  border: 2px solid #8b6914;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ffd700;
    transform: scale(1.2);
  }
`;

const HearthstoneCollection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [deck, setDeck] = useState<CardEntity[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // 샘플 카드 데이터 변환
  const cards = sampleCards.map((card) => new CardEntity(card));
  const cardsPerPage = 8;
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const displayedCards = cards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const handleAddToDeck = (card: CardEntity) => {
    if (deck.length < 30) {
      setDeck([...deck, card]);
    }
  };

  const handleRemoveFromDeck = (index: number) => {
    setDeck(deck.filter((_, i) => i !== index));
  };

  const calculateAverageCost = () => {
    if (deck.length === 0) return 0;
    const totalCost = deck.reduce((sum, card) => sum + card.cost, 0);
    return (totalCost / deck.length).toFixed(1);
  };

  return (
    <CollectionContainer>
      <Header>
        <Title>내 컬렉션</Title>
        <BackButton size="medium" onClick={() => navigate('/lobby')}>
          돌아가기
        </BackButton>
      </Header>

      <MainContent>
        <CollectionSection>
          <HearthstonePanel variant="wood" size="large">
            <FilterBar>
              <FilterButton
                active={selectedFilter === 'all'}
                onClick={() => setSelectedFilter('all')}
              >
                전체
              </FilterButton>
              <FilterButton
                active={selectedFilter === 'minion'}
                onClick={() => setSelectedFilter('minion')}
              >
                하수인
              </FilterButton>
              <FilterButton
                active={selectedFilter === 'spell'}
                onClick={() => setSelectedFilter('spell')}
              >
                주문
              </FilterButton>
              <FilterButton
                active={selectedFilter === 'weapon'}
                onClick={() => setSelectedFilter('weapon')}
              >
                무기
              </FilterButton>
            </FilterBar>

            <CardGrid>
              {displayedCards.map((card) => (
                <HearthstoneCard
                  key={card.id}
                  card={card}
                  size="small"
                  isHovered={hoveredCard === card.id}
                  onClick={() => handleAddToDeck(card)}
                  onHover={(hovering) => setHoveredCard(hovering ? card.id : null)}
                />
              ))}
            </CardGrid>

            <PageIndicator>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PageDot
                  key={index}
                  active={index === currentPage}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </PageIndicator>
          </HearthstonePanel>
        </CollectionSection>

        <DeckSection>
          <HearthstonePanel variant="parchment" size="full">
            <DeckHeader>
              <DeckTitle>새 덱</DeckTitle>
              <DeckInfo>
                <DeckStat>
                  <StatValue>{deck.length}/30</StatValue>
                  <StatLabel>카드</StatLabel>
                </DeckStat>
                <DeckStat>
                  <StatValue>{calculateAverageCost()}</StatValue>
                  <StatLabel>평균 비용</StatLabel>
                </DeckStat>
              </DeckInfo>
            </DeckHeader>

            <DeckList>
              {deck.map((card, index) => (
                <DeckCard key={`${card.id}-${index}`} onClick={() => handleRemoveFromDeck(index)}>
                  <DeckCardCost>{card.cost}</DeckCardCost>
                  <DeckCardName>{card.name}</DeckCardName>
                </DeckCard>
              ))}
            </DeckList>

            <DeckActions>
              <HearthstoneButton
                size="medium"
                variant="confirm"
                fullWidth
                disabled={deck.length !== 30}
              >
                덱 저장
              </HearthstoneButton>
              <HearthstoneButton
                size="medium"
                variant="cancel"
                fullWidth
                onClick={() => setDeck([])}
              >
                초기화
              </HearthstoneButton>
            </DeckActions>
          </HearthstonePanel>
        </DeckSection>
      </MainContent>
    </CollectionContainer>
  );
};

export default HearthstoneCollection;
