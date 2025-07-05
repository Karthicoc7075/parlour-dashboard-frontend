'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Auth = {
  token: string;
  role: 'admin' | 'super_admin';
  user: { name: string; email: string; _id: string };
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userData = localStorage.getItem('user');

    if (token && role && userData) {
      setUser({
        token,
        role: role as 'admin' | 'super_admin',
        user: JSON.parse(userData),
      });
    }
    setLoading(false);
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
