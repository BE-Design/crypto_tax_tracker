import { useEffect } from 'react';

/**
 * Custom hook for handling keypress events for a given keycode and keypress event type.
 *
 * @param {Integer} keyCode
 * @param {Function} handler
 * @param {String} eventType
 * @param {Array} deps
 */
export const useKeypress = (keyCode, handler, eventType = 'keypress', deps = []) => {
  useEffect(() => {
    if (!['keypress', 'keydown', 'keyup'].includes(eventType)) {
      throw 'Invalid keypress event type. Must be: `keydown`, `keyup`, or `keypress`';
    }

    const handleKeypress = e => {
      if (e.keyCode === keyCode) {
        handler();
      }
    };

    document.addEventListener(eventType, handleKeypress);

    // tears down the event listener on unmount.
    return () => document.removeEventListener(eventType, handleKeypress);
  }, deps);
};