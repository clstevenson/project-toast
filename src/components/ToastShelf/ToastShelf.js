import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toastMessages, handleClose }) {

  return (
    <ol className={styles.wrapper}>
      {toastMessages.map((toast) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast id={toast.id} variant={toast.variant} handleClose={handleClose}>
              {toast.message}
            </Toast>
          </li>
        )
      })}
    </ol>
  );
}

export default ToastShelf;
