'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Auth = {
  token: string;
  role: 'admin' | 'super_admin';
  user: {
    name: string;
    email: string;
    _id: string;
  };
};

type AuthContextType = {
  user: Auth | null;
  setUser: React.Dispatch<React.SetStateAction<Auth | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

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

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
