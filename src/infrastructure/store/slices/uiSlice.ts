import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface Modal {
  id: string;
  component: string;
  props?: Record<string, any>;
}

interface UIState {
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isDeckBuilderOpen: boolean;
  activeModal: Modal | null;
  toasts: Toast[];
  isMatchmaking: boolean;
  matchmakingTime: number;
}

const initialState: UIState = {
  isSidebarOpen: true,
  isSettingsOpen: false,
  isDeckBuilderOpen: false,
  activeModal: null,
  toasts: [],
  isMatchmaking: false,
  matchmakingTime: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSettingsOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingsOpen = action.payload;
    },
    setDeckBuilderOpen: (state, action: PayloadAction<boolean>) => {
      state.isDeckBuilderOpen = action.payload;
    },
    showModal: (state, action: PayloadAction<Modal>) => {
      state.activeModal = action.payload;
    },
    hideModal: (state) => {
      state.activeModal = null;
    },
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    setMatchmaking: (state, action: PayloadAction<boolean>) => {
      state.isMatchmaking = action.payload;
      if (!action.payload) {
        state.matchmakingTime = 0;
      }
    },
    updateMatchmakingTime: (state, action: PayloadAction<number>) => {
      state.matchmakingTime = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSettingsOpen,
  setDeckBuilderOpen,
  showModal,
  hideModal,
  addToast,
  removeToast,
  setMatchmaking,
  updateMatchmakingTime,
} = uiSlice.actions;

export default uiSlice.reducer;
