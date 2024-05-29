// Provides global state: array of Toast Object data
// props for each object: message and variant

import React from 'react';

export const ToastContext = React.createContext();

export default function ToastProvider({ children }) {
  // state for stack of messages
  const [toastMessages, setToastMessages] = React.useState([]);

  // CB to remove a specific toast message
  const removeToast = (id) => {
    const toastArray = toastMessages.filter(toast => toast.id !== id);

    setToastMessages([...toastArray]);
  }

  const clearToasts = () => setToastMessages([]);

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

  // let's combine everything into a memo-ized object
  const value = React.useMemo(() => {
    return { toastMessages, removeToast, addToast, clearToasts }
  }, [toastMessages, addToast, removeToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}
