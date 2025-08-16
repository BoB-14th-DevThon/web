import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@infrastructure/store';
import { loginStart, loginSuccess, loginFailure } from '@infrastructure/store/slices/authSlice';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // TODO: 실제 로그인/회원가입 API 호출
      const mockUser = {
        id: '1',
        username,
        email: `${username}@example.com`,
        rating: 1000,
        gamesPlayed: 0,
        wins: 0,
      };

      dispatch(loginSuccess(mockUser));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure('로그인에 실패했습니다.'));
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>BoBStone</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{isRegistering ? '회원가입' : '로그인'}</h2>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="사용자명"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            {isRegistering ? '가입하기' : '로그인'}
          </button>

          <p className="toggle-mode">
            {isRegistering ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="link-button"
            >
              {isRegistering ? '로그인' : '회원가입'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};
