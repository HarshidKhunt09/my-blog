import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const useThemeSwitcher = () => {
  const [mode, setMode] = useState(() => localStorage.getItem('mode'));

  useEffect(() => {
    window.addEventListener('storage', setPreferredTheme);
    return () => {
      window.removeEventListener('storage', setPreferredTheme);
    };
  }, []);

  const setPreferredTheme = () => {
    const _mode = localStorage.getItem('mode');
    if (_mode) {
      setMode(_mode);
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      localStorage.setItem('mode', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('mode', 'light');
    }
  });

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className='cursor-pointer'
      onClick={() => setMode((mode) => (mode === 'dark' ? 'light' : 'dark'))}
    >
      {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </a>
  );
};

export default useThemeSwitcher;
