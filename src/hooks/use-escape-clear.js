// custom hook accepts a CB function that clears something

import React from 'react';

export default function useEscapeClear(handleClear) {
  React.useEffect(() => {
    const handleKeyDown = (evt) => {
      if (evt.code === 'Escape') handleClear();
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  })
}
