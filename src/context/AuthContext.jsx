import React, { createContext, useContext, useState } from 'react';

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

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.user);
        localStorage.setItem('shift_admin_auth', JSON.stringify(data.user));
        if (data.token) {
          sessionStorage.setItem('shift_admin_token', data.token);
        }
        return { success: true };
      }

      return {
        success: false,
        error: data.error || 'Սխալ էլ․ հասցե կամ գաղտնաբառ։'
      };
    } catch (err) {
      return {
        success: false,
        error: 'Սերվերն անհասանելի է։ Ստուգեք կապը կամ փորձեք ավելի ուշ։'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shift_admin_auth');
    sessionStorage.removeItem('shift_admin_token');
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
      login: async () => ({ success: false, error: 'Auth context missing' }),
      logout: () => {}
    };
  }
  return context;
};
