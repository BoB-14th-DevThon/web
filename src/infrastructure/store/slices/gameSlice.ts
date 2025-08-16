import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Card } from '@domain/entities';
import { GamePhase, UUID } from '@shared/types';

interface GameState {
  currentGame: Game | null;
  isLoading: boolean;
  error: string | null;
  selectedCard: Card | null;
  hoveredCard: Card | null;
  validTargets: UUID[];
}

const initialState: GameState = {
  currentGame: null,
  isLoading: false,
  error: null,
  selectedCard: null,
  hoveredCard: null,
  validTargets: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<Game>) => {
      state.currentGame = action.payload;
      state.error = null;
    },
    updateGamePhase: (state, action: PayloadAction<GamePhase>) => {
      if (state.currentGame) {
        state.currentGame.phase = action.payload;
      }
    },
    setSelectedCard: (state, action: PayloadAction<Card | null>) => {
      state.selectedCard = action.payload;
    },
    setHoveredCard: (state, action: PayloadAction<Card | null>) => {
      state.hoveredCard = action.payload;
    },
    setValidTargets: (state, action: PayloadAction<UUID[]>) => {
      state.validTargets = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearGame: (state) => {
      state.currentGame = null;
      state.selectedCard = null;
      state.hoveredCard = null;
      state.validTargets = [];
    },
  },
});

export const {
  setGame,
  updateGamePhase,
  setSelectedCard,
  setHoveredCard,
  setValidTargets,
  setLoading,
  setError,
  clearGame,
} = gameSlice.actions;

export default gameSlice.reducer;
