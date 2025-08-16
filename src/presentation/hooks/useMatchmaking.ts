import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@infrastructure/store';
import { setMatchmaking } from '@infrastructure/store/slices/uiSlice';
import { addToast } from '@infrastructure/store/slices/uiSlice';
import { SocketManager } from '@infrastructure/socket/SocketManager';
import { MockGameServer } from '@infrastructure/mock/mockServer';
import { UUID } from '@shared/types';

export const useMatchmaking = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socket = SocketManager.getInstance();
  const mockServer = MockGameServer.getInstance();
  
  const { isMatchmaking, matchmakingTime } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);
  
  // 매칭 타이머 관리
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isMatchmaking) {
      timer = setInterval(() => {
        dispatch(setMatchmaking(true)); // 타이머 유지
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isMatchmaking, dispatch]);

  useEffect(() => {
    // 매칭 시간 포맷팅
    if (isMatchmaking && matchmakingTime > 0) {
      const minutes = Math.floor(matchmakingTime / 60);
      const seconds = matchmakingTime % 60;
      document.title = `매칭 중... (${minutes}:${seconds.toString().padStart(2, '0')}) - BoBStone`;
    } else {
      document.title = 'BoBStone';
    }
  }, [isMatchmaking, matchmakingTime]);

  const startMatchmaking = useCallback(async (deckId?: UUID) => {
    if (!user) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: '로그인이 필요합니다',
        type: 'error',
        duration: 3000,
      }));
      return;
    }

    // Mock 서버 사용 (실제 서버가 연결되지 않은 경우)
    if (!socket.isConnected()) {
      dispatch(addToast({
        id: Date.now().toString(),
        message: 'Mock 서버로 연결합니다',
        type: 'info',
        duration: 3000,
      }));
      
      dispatch(setMatchmaking(true));
      
      try {
        const result = await mockServer.joinMatchmaking(user.id);
        dispatch(setMatchmaking(false));
        dispatch(addToast({
          id: Date.now().toString(),
          message: `상대를 찾았습니다!`,
          type: 'success',
          duration: 3000,
        }));
        navigate(`/game/${result.gameId}`);
      } catch (error) {
        dispatch(setMatchmaking(false));
        dispatch(addToast({
          id: Date.now().toString(),
          message: '매칭에 실패했습니다',
          type: 'error',
          duration: 3000,
        }));
      }
      return;
    }

    // 실제 서버 사용
    const selectedDeckId = deckId || 'default-deck-id';
    dispatch(setMatchmaking(true));
    socket.joinMatchmaking(selectedDeckId);
  }, [user, socket, mockServer, dispatch, navigate]);

  const cancelMatchmaking = useCallback(() => {
    dispatch(setMatchmaking(false));
    socket.cancelMatchmaking();
  }, [socket, dispatch]);

  const getFormattedTime = useCallback(() => {
    const minutes = Math.floor(matchmakingTime / 60);
    const seconds = matchmakingTime % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [matchmakingTime]);

  return {
    isMatchmaking,
    matchmakingTime,
    formattedTime: getFormattedTime(),
    startMatchmaking,
    cancelMatchmaking,
  };
};
