import { useEffect, useRef } from 'react';
import { useAppSelector } from '@infrastructure/store';
import { SocketManager } from '@infrastructure/socket/SocketManager';

export const useSocket = () => {
  const socketRef = useRef<SocketManager | null>(null);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = SocketManager.getInstance();
    }

    if (user && !socketRef.current.isConnected()) {
      // 실제로는 인증 토큰을 사용해야 함
      socketRef.current.connect(user.id);
    }

    return () => {
      // 컴포넌트 언마운트 시 연결 유지 (싱글톤)
    };
  }, [user]);

  return socketRef.current;
};
