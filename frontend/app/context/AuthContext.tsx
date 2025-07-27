'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    toast({
      title: 'Aguarde, estamos realizando seu login!',
      description: 'Logo você será redirecionado.',
    });
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Estamos redirecionado você.',
          variant: 'success',
        });
        setError(null);
        setUser({ email });
        router.push('/');
      } else if (response.status === 401) {
        toast({
          title: data.error || 'Credenciais inválidas.',
          description: 'Verifique e tente novamente.',
          variant: 'destructive',
        });
        setError(data.error || 'Credenciais inválidas.');
        setUser(null);
      } else {
        toast({
          title: data.error || 'Erro ao fazer login.',
          description: 'Tente novamente.',
          variant: 'destructive',
        });
        setError(data.error || 'Erro ao fazer login');
        setUser(null);
      }
    } catch {
      toast({
        title: 'Erro no sistema.',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
      setError('Erro no sistema.');
      setUser(null);
      throw new Error('Erro no sistema.');
    }
  };

  const logout = async () => {
    toast({
      title: 'Saindo...',
      description: 'Logo você será redirecionado.',
      variant: 'default',
    });
    try {
      await fetch('/api/logout', { method: 'POST' });
      toast({
        title: 'Logout realizado com sucesso!',
        description: 'Volte sempre!',
        variant: 'success',
      });
      setUser(null);
      router.push('/login');
    } catch {
      toast({
        title: 'Erro ao fazer logout.',
        description: 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
