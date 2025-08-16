import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@infrastructure/store';
import { HomePage } from '@presentation/pages/HomePage';
import { GamePage } from '@presentation/pages/GamePage';
import { DeckBuilderPage } from '@presentation/pages/DeckBuilderPage';
import { LoginPage } from '@presentation/pages/LoginPage';
import { ProtectedRoute } from '@presentation/components/ProtectedRoute';
import { Toast } from '@presentation/components/Toast';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Toast />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <ProtectedRoute>
                <GamePage />
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
