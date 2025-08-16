import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Deck } from '@domain/entities';

export const DeckBuilderPage = () => {
  const navigate = useNavigate();
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // TODO: 실제 카드 데이터 로드
  const availableCards: Card[] = [];
  const userDecks: Deck[] = [];

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSaveDeck = () => {
    // TODO: 덱 저장 로직
    console.log('Saving deck:', selectedDeck);
  };

  return (
    <div className="deck-builder-page">
      <header className="deck-builder-header">
        <button onClick={handleBackClick}>뒤로가기</button>
        <h1>덱 편집기</h1>
        <button onClick={handleSaveDeck} disabled={!selectedDeck}>
          저장
        </button>
      </header>

      <div className="deck-builder-content">
        <aside className="deck-list">
          <h2>내 덱</h2>
          <button className="new-deck-button">새 덱 만들기</button>
          <ul>
            {userDecks.map((deck) => (
              <li
                key={deck.id}
                onClick={() => setSelectedDeck(deck)}
                className={selectedDeck?.id === deck.id ? 'selected' : ''}
              >
                {deck.name}
              </li>
            ))}
          </ul>
        </aside>

        <main className="deck-editor">
          {selectedDeck ? (
            <>
              <h2>{selectedDeck.name}</h2>
              <div className="deck-cards">
                {/* TODO: 덱 카드 표시 */}
              </div>
            </>
          ) : (
            <p>덱을 선택하거나 새로 만들어주세요.</p>
          )}
        </main>

        <aside className="card-collection">
          <div className="card-search">
            <input
              type="text"
              placeholder="카드 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="card-grid">
            {availableCards
              .filter((card) =>
                card.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((card) => (
                <div key={card.id} className="card-item">
                  {card.name}
                </div>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
