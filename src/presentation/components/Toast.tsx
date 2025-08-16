import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@infrastructure/store';
import { removeToast } from '@infrastructure/store/slices/uiSlice';

export const Toast = () => {
  const dispatch = useAppDispatch();
  const { toasts } = useAppSelector((state) => state.ui);

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, toast.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          onClick={() => dispatch(removeToast(toast.id))}
        >
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close">×</button>
        </div>
      ))}
    </div>
  );
};
