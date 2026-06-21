import { useState, useCallback } from 'react';
import api from '../utils/api';
import { User, ApiResponse } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', {
        email,
        password,
      });
      if (data.data) {
        localStorage.setItem('token', data.data.token);
        setUser(data.data.user);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', {
        username,
        email,
        password,
      });
      if (data.data) {
        localStorage.setItem('token', data.data.token);
        setUser(data.data.user);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return { user, loading, error, login, register, logout };
}
