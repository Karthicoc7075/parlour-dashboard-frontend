'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user,loading } = useAuth();
  const router = useRouter();


  
  useEffect(() => {
    console.log('ProtectedRoute user:', user);
    if (!user?.token && !loading) {
      router.replace('/login');
    }
  }, [user, loading]);

  if (!user?.token) return null;

  return <>{children}</>;
}
