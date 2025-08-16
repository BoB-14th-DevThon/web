import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/react';
import { store } from '@infrastructure/store';
import { DeckBuilderPage } from '@presentation/pages/DeckBuilderPage';
import { LoginPage } from '@presentation/pages/LoginPage';
import { ProtectedRoute } from '@presentation/components/ProtectedRoute';
import { Toast } from '@presentation/components/Toast';
import HearthstoneLobby from './presentation/pages/HearthstoneLobby';
import HearthstoneMatchmaking from './presentation/pages/HearthstoneMatchmaking';
import HearthstoneCollection from './presentation/pages/HearthstoneCollection';
import HearthstoneBattlefield from './presentation/pages/HearthstoneBattlefield';
import HearthstoneSettings from './presentation/pages/HearthstoneSettings';
import './App.css';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');

  @font-face {
    font-family: 'Belwe Bold';
    src: url('https://fonts.cdnfonts.com/s/15757/BelweBoldBT.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Franklin Gothic', Arial, sans-serif;
    background: #000000;
    color: #faf8f6;
    overflow-x: hidden;
    position: relative;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(30, 20, 10, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(10, 20, 30, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(20, 15, 10, 0.2) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Belwe Bold', 'Cinzel', Georgia, serif;
    letter-spacing: 0.05em;
  }

  /* 하스스톤 스타일 스크롤바 */
  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background: linear-gradient(180deg, #2c1810 0%, #1a0f08 100%);
    border: 1px solid #8b6914;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #ffd700 0%, #b8860b 50%, #8b6914 100%);
    border-radius: 7px;
    border: 1px solid #ffd700;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #ffa500 0%, #ffd700 50%, #b8860b 100%);
    box-shadow:
      inset 0 0 5px rgba(0, 0, 0, 0.5),
      0 0 10px rgba(255, 215, 0, 0.5);
  }

  /* 하스스톤 스타일 선택 효과 */
  ::selection {
    background: rgba(255, 215, 0, 0.3);
    color: #ffffff;
  }

  /* 버튼 기본 스타일 */
  button {
    font-family: 'Belwe Bold', 'Franklin Gothic', Arial, sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* 애니메이션 부드럽게 */
  * {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const App = () => {
  return (
    <Provider store={store}>
      <Global styles={globalStyles} />
      <Router>
        <Toast />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/lobby" element={<HearthstoneLobby />} />
          <Route path="/matchmaking" element={<HearthstoneMatchmaking />} />
          <Route path="/battlefield" element={<HearthstoneBattlefield />} />
          <Route path="/collection" element={<HearthstoneCollection />} />
          <Route path="/ranked" element={<HearthstoneLobby />} />
          <Route path="/practice" element={<HearthstoneLobby />} />
          <Route
            path="/settings"
            element={
              <>
                <HearthstoneLobby />
                <HearthstoneSettings isOpen={true} onClose={() => window.history.back()} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/lobby" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <ProtectedRoute>
                <HearthstoneBattlefield />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deck-builder"
            element={
              <ProtectedRoute>
                <DeckBuilderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
