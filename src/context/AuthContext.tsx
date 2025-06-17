import React, { createContext, useContext, useState, ReactNode } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

interface User {
  id?: string;
  email: string;
  name?: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    unstable_batchedUpdates(() => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    });
  }; 
// Will need backend integration for actual authentication

  const logout = () => {
    unstable_batchedUpdates(() => {
      setUser(null);
      localStorage.removeItem('user');
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};