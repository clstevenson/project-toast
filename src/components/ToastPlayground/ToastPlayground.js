import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

import Toast from '../Toast';
import ToastShelf from '../ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  // state for stack of messages
  const [toastMessages, setToastMessages] = React.useState([
    {
      id: crypto.randomUUID(),
      variant: 'notice',
      message: 'Example notice toast',
    },
    {
      id: crypto.randomUUID(),
      variant: 'error',
      message: 'Example error toast',
    },
  ])

  // this doesn't work quite right, only pops off the top of the stack of messages
  // better would be to figure out which message was closed and eliminate that one
  const handleClose = () => {
    const toastArray = [...toastMessages];
    toastArray.pop();
    setToastMessages([...toastArray]);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // push new message onto stack
    const newToast = {
      id: crypto.randomUUID(),
      variant: variant,
      message: message,
    };
    setToastMessages([...toastMessages, newToast]);

    // reset form
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toastMessages={toastMessages} handleClose={handleClose} />

      <form
        className={styles.controlsWrapper}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map(option => {
              const idString = `variant-${option}`;
              return (
                <label htmlFor={idString} key={idString}>
                  <input
                    id={idString}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={e => setVariant(e.target.value)}
                  />
                  {option}
                </label>
              )
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
