"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const PharmAuthContext = createContext();

export const usePharmAuth = () => useContext(PharmAuthContext);

export const PharmAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
    Cookies.set('pharmtoken', token, { expires: 30 });
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('pharmtoken');
  };

  useEffect(() => {
    const tokenFromCookie = Cookies.get('pharmtoken');
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  return (
    <PharmAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </PharmAuthContext.Provider>
  );
};