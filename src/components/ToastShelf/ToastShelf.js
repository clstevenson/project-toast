import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

import { ToastContext } from '../ToastProvider';

function ToastShelf() {

  const { toastMessages, clearToasts } = React.useContext(ToastContext);

  React.useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === 'Escape') clearToasts();
    }

    window.addEventListener('keydown', handleKeyDown);

    // clean up event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  }, [toastMessages, clearToasts]);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toastMessages.map((toast) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast id={toast.id} variant={toast.variant}>
              {toast.message}
            </Toast>
          </li>
        )
      })}
    </ol>
  );
}

export default ToastShelf;
