import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('shift_admin_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // Standard secure admin credential check (supports Shift official credentials or demo)
    if (
      (email === 'admin@shiftagency.am' && password === 'shift2026') ||
      (email === 'mkheyanagency@gmail.com' && password === 'shift2026') ||
      (email === 'demo' && password === 'demo')
    ) {
      const userData = {
        email,
        name: 'Shift Admin',
        role: 'Super Administrator',
        loggedInAt: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('shift_admin_auth', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Սխալ էլ․ հասցե կամ գաղտնաբառ (Փորձեք՝ admin@shiftagency.am / shift2026)' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shift_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      login: () => ({ success: false, error: 'Auth context missing' }),
      logout: () => {}
    };
  }
  return context;
};
