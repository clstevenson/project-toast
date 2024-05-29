import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

import { ToastContext } from '../ToastProvider';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ children, id, variant }) {
  const IconTag = ICONS_BY_VARIANT[variant];
  const { removeToast } = React.useContext(ToastContext);

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconTag size={24} />
      </div>
      <p className={`styles.${variant}`}>
        <VisuallyHidden> {variant} - </VisuallyHidden>
        {children}
      </p>
      <button
        className={styles.closeButton}
        onClick={() => removeToast(id)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
        {/* <VisuallyHidden>Dismiss message</VisuallyHidden> */}
      </button>
    </div>
  );
}

export default Toast;
