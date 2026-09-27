import { useState, useEffect } from 'react';

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    reducedMotion: false,
    isTouchDevice: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');

    const updateCapabilities = () => {
      setCapabilities({
        reducedMotion: motionQuery.matches,
        isTouchDevice: touchQuery.matches,
      });
    };

    updateCapabilities();

    motionQuery.addEventListener('change', updateCapabilities);
    touchQuery.addEventListener('change', updateCapabilities);

    return () => {
      motionQuery.removeEventListener('change', updateCapabilities);
      touchQuery.removeEventListener('change', updateCapabilities);
    };
  }, []);

  return capabilities;
}
