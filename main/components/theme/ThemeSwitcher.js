"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';


const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState)
  }

  useEffect(() => {
    setMounted(true);
    if (theme === 'dark') {
      setIsDarkMode(true);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={() => {toggleDarkMode(); setTheme(theme === 'dark' ? 'light' : 'dark')}}
        className="flex items-center justify-center w-10 h-10 rounded-full transition-colors bg-background text-muted-foreground hover:bg-muted/10"
      >
        {isDarkMode ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
      </button>
    </div>
  )
};

export default ThemeSwitcher;

function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#95d3df"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#205e6a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
