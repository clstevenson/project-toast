import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

import { ToastContext } from '../ToastProvider';

function ToastShelf() {

  const { toastMessages } = React.useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
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
