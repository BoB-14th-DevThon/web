import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@infrastructure/store';
import { setSelectedCard, setValidTargets, setGame } from '@infrastructure/store/slices/gameSlice';
import { addToast } from '@infrastructure/store/slices/uiSlice';
import { SocketManager } from '@infrastructure/socket/SocketManager';
import { MockGameServer } from '@infrastructure/mock/mockServer';
import { Card } from '@domain/entities';
import { UUID } from '@shared/types';

export const useGame = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socket = SocketManager.getInstance();
  const mockServer = MockGameServer.getInstance();
  
  const { currentGame, selectedCard, validTargets } = useAppSelector((state) => state.game);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!gameId) {
      navigate('/');
      return;
    }

    // 게임에 재연결 시도
    if (!currentGame || currentGame.id !== gameId) {
      // Mock 서버에서 게임 가져오기
      const game = mockServer.getGame(gameId);
      if (game) {
        dispatch(setGame(game));
      } else {
        dispatch(addToast({
          id: Date.now().toString(),
          message: '게임을 찾을 수 없습니다',
          type: 'error',
          duration: 3000,
        }));
        navigate('/');
      }
    }
  }, [gameId, currentGame, navigate, dispatch, mockServer]);

  // Mock 서버 사용 시 상태 업데이트 폴링
  useEffect(() => {
    if (!socket.isConnected() && currentGame && gameId) {
      const interval = setInterval(() => {
        const updatedGame = mockServer.getGame(gameId);
        if (updatedGame && JSON.stringify(updatedGame) !== JSON.stringify(currentGame)) {
          dispatch(setGame(updatedGame));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [socket, currentGame, gameId, mockServer, dispatch]);

  const selectCard = useCallback((card: Card | null) => {
    dispatch(setSelectedCard(card));
    
    if (card) {
      // 유효한 타겟 계산
      const targets: UUID[] = [];
      
      if (card.isSpell()) {
        // 주문 카드의 타겟 계산
        if (currentGame) {
          const opponent = currentGame.getOpponentPlayer();
          targets.push(opponent.id); // 상대 영웅
          opponent.board.forEach(minion => targets.push(minion.id)); // 상대 하수인
        }
      }
      
      dispatch(setValidTargets(targets));
    } else {
      dispatch(setValidTargets([]));
    }
  }, [dispatch, currentGame]);

  const playCard = useCallback((cardId: UUID, targetId?: UUID) => {
    if (!currentGame || !user || !gameId) return;
    
    const currentPlayer = currentGame.getCurrentPlayer();
    if (currentPlayer.id !== user.id) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: '당신의 턴이 아닙니다',
        type: 'warning',
        duration: 3000,
      }));
      return;
    }

    // Mock 서버 사용
    if (!socket.isConnected()) {
      const success = mockServer.playCard(gameId, user.id, cardId, targetId);
      if (success) {
        const updatedGame = mockServer.getGame(gameId);
        if (updatedGame) {
          dispatch(setGame(updatedGame));
        }
      }
    } else {
      socket.playCard(cardId, targetId);
    }
    
    dispatch(setSelectedCard(null));
    dispatch(setValidTargets([]));
  }, [currentGame, user, gameId, socket, mockServer, dispatch]);

  const attack = useCallback((attackerId: UUID, targetId: UUID) => {
    if (!currentGame || !user) return;
    
    const currentPlayer = currentGame.getCurrentPlayer();
    if (currentPlayer.id !== user.id) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: '당신의 턴이 아닙니다',
        type: 'warning',
        duration: 3000,
      }));
      return;
    }

    socket.attack(attackerId, targetId);
  }, [currentGame, user, socket, dispatch]);

  const endTurn = useCallback(() => {
    if (!currentGame || !user || !gameId) return;
    
    const currentPlayer = currentGame.getCurrentPlayer();
    if (currentPlayer.id !== user.id) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: '당신의 턴이 아닙니다',
        type: 'warning',
        duration: 3000,
      }));
      return;
    }

    // Mock 서버 사용
    if (!socket.isConnected()) {
      const success = mockServer.endTurn(gameId, user.id);
      if (success) {
        const updatedGame = mockServer.getGame(gameId);
        if (updatedGame) {
          dispatch(setGame(updatedGame));
        }
      }
    } else {
      socket.endTurn();
    }
  }, [currentGame, user, gameId, socket, mockServer, dispatch]);

  const concede = useCallback(() => {
    if (!currentGame) return;
    
    if (window.confirm('정말로 항복하시겠습니까?')) {
      socket.concede();
    }
  }, [currentGame, socket]);

  const sendEmote = useCallback((emoteId: string) => {
    socket.sendEmote(emoteId);
  }, [socket]);

  return {
    game: currentGame,
    selectedCard,
    validTargets,
    isMyTurn: currentGame && user ? currentGame.currentPlayerId === user.id : false,
    actions: {
      selectCard,
      playCard,
      attack,
      endTurn,
      concede,
      sendEmote,
    },
  };
};
