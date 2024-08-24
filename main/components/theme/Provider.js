// components/Provider.js
"use client";

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

const Provider = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      {children}
    </ThemeProvider>
  );
};

export default Provider;
