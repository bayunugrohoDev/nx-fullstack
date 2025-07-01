import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LoginResponse, User } from '@glibs/types'; // Assume User type exists
import { Text, View, ActivityIndicator } from 'react-native'; // Using basic RN components

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading auth status on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      // In a real app, you would check AsyncStorage for a token here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // For now, let's assume not authenticated by default
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    };
    checkAuthStatus();
  }, []);

  const login = async (token: string, userData: User) => {
    // In a real app, save token to AsyncStorage
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    // In a real app, clear token from AsyncStorage
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
