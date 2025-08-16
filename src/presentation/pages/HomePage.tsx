import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@infrastructure/store';
import { useSocket, useMatchmaking } from '@presentation/hooks';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { isMatchmaking, formattedTime, startMatchmaking, cancelMatchmaking } = useMatchmaking();
  
  // Socket 연결 초기화
  useSocket();

  const handlePlayClick = () => {
    startMatchmaking();
  };

  const handleDeckBuilderClick = () => {
    navigate('/deck-builder');
  };

  const handleCancelMatchmaking = () => {
    cancelMatchmaking();
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>BoBStone</h1>
        <div className="user-info">
          <span>환영합니다, {user?.username}님!</span>
          <span>레이팅: {user?.rating}</span>
        </div>
      </header>

      <main className="home-main">
        {!isMatchmaking ? (
          <div className="menu-buttons">
            <button className="play-button" onClick={handlePlayClick}>
              게임 시작
            </button>
            <button className="deck-button" onClick={handleDeckBuilderClick}>
              덱 편집기
            </button>
            <button className="settings-button">
              설정
            </button>
          </div>
        ) : (
          <div className="matchmaking">
            <h2>상대를 찾는 중...</h2>
            <div className="matchmaking-time">{formattedTime}</div>
            <div className="spinner" />
            <button onClick={handleCancelMatchmaking}>취소</button>
          </div>
        )}
      </main>
    </div>
  );
};
