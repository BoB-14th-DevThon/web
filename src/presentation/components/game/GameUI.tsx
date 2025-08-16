import { Game } from '@domain/entities';
import { useState } from 'react';

interface GameUIProps {
  game: Game;
  isMyTurn: boolean;
  onEndTurn: () => void;
  onConcede: () => void;
  onEmote: (emoteId: string) => void;
}

export const GameUI = ({ game, isMyTurn, onEndTurn, onConcede, onEmote }: GameUIProps) => {
  const [showEmotes, setShowEmotes] = useState(false);
  
  const emotes = [
    { id: 'greet', text: '안녕하세요!' },
    { id: 'thanks', text: '감사합니다!' },
    { id: 'sorry', text: '죄송합니다!' },
    { id: 'wow', text: '대단하네요!' },
    { id: 'oops', text: '이런!' },
    { id: 'threaten', text: '당신은 끝났어!' },
  ];

  const currentPlayer = game.getCurrentPlayer();
  const opponentPlayer = game.getOpponentPlayer();

  return (
    <div className="game-ui">
      {/* 상대 정보 */}
      <div className="opponent-info">
        <div className="player-stats">
          <span className="player-name">{opponentPlayer.name}</span>
          <div className="health-display">
            <span className="health">{opponentPlayer.health}</span>
            <span className="max-health">/{opponentPlayer.maxHealth}</span>
          </div>
          <div className="mana-display">
            <span className="mana">{opponentPlayer.mana}</span>
            <span className="max-mana">/{opponentPlayer.maxMana}</span>
          </div>
        </div>
        <div className="hand-count">
          손패: {opponentPlayer.getHandSize()}장
        </div>
        <div className="deck-count">
          덱: {opponentPlayer.deck.getRemaining()}장
        </div>
      </div>

      {/* 내 정보 */}
      <div className="player-info">
        <div className="player-stats">
          <span className="player-name">{currentPlayer.name}</span>
          <div className="health-display">
            <span className="health">{currentPlayer.health}</span>
            <span className="max-health">/{currentPlayer.maxHealth}</span>
          </div>
          <div className="mana-display">
            <span className="mana">{currentPlayer.mana}</span>
            <span className="max-mana">/{currentPlayer.maxMana}</span>
          </div>
        </div>
        <div className="deck-count">
          덱: {currentPlayer.deck.getRemaining()}장
        </div>
      </div>

      {/* 턴 종료 버튼 */}
      <button
        className="end-turn-button"
        onClick={onEndTurn}
        disabled={!isMyTurn}
      >
        {isMyTurn ? '턴 종료' : '상대 턴'}
      </button>

      {/* 이모트 버튼 */}
      <div className="emote-container">
        <button
          className="emote-button"
          onClick={() => setShowEmotes(!showEmotes)}
        >
          이모트
        </button>
        {showEmotes && (
          <div className="emote-menu">
            {emotes.map((emote) => (
              <button
                key={emote.id}
                onClick={() => {
                  onEmote(emote.id);
                  setShowEmotes(false);
                }}
              >
                {emote.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 항복 버튼 */}
      <button
        className="concede-button"
        onClick={onConcede}
      >
        항복
      </button>

      {/* 게임 로그 */}
      <div className="game-log">
        <h3>게임 로그</h3>
        <div className="log-entries">
          {/* TODO: 게임 로그 표시 */}
        </div>
      </div>
    </div>
  );
};
