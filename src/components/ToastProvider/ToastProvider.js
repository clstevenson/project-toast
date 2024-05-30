// Provides global state: array of Toast Object data
// props for each object: message and variant

import React from 'react';
import useEscapeKey from '../../hooks/useEscapeKey';

export const ToastContext = React.createContext();

export default function ToastProvider({ children }) {
  // state for stack of messages
  const [toastMessages, setToastMessages] = React.useState([]);

  // CB to remove a specific toast message
  const removeToast = (id) => {
    const toastArray = toastMessages.filter(toast => toast.id !== id);

    setToastMessages([...toastArray]);
  }

  // CB to add a toast message to the existing stack
  const addToast = ({ variant, message }) => {
    // push new message onto stack
    const newToast = {
      id: crypto.randomUUID(),
      variant,
      message,
    };
    setToastMessages([...toastMessages, newToast]);
  }

  // custom hook to set ESC to dismiss all toasts
  useEscapeKey(() => setToastMessages([]));

  return (
    <ToastContext.Provider value={{ toastMessages, removeToast, addToast }}>
      {children}
    </ToastContext.Provider>
  )
}
