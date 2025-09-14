'use client';

import { useState, useEffect } from 'react';

interface UserInfo {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('authToken');
      const storedUserInfo = localStorage.getItem('userInfo');
      
      if (token && storedUserInfo) {
        setIsAuthenticated(true);
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, user?: UserInfo) => {
    try {
      localStorage.setItem('authToken', token);
      if (user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
        setUserInfo(user);
      }
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Error storing auth data:', error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      setIsAuthenticated(false);
      setUserInfo(null);
      return true;
    } catch (error) {
      console.error('Error clearing auth data:', error);
      return false;
    }
  };

  const getToken = (): string | null => {
    try {
      return localStorage.getItem('authToken');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  };

  const isTokenValid = (): boolean => {
    const token = getToken();
    if (!token) return false;
    
    // You can add JWT expiration checking here if needed
    // For now, just check if token exists
    return true;
  };

  return {
    isAuthenticated,
    userInfo,
    isLoading,
    login,
    logout,
    getToken,
    isTokenValid,
    checkAuthStatus,
  };
}
