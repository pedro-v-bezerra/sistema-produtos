'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background p-4'>
      <div className='w-full max-w-md'>
        <Card className='shadow-lg border-0 bg-card/50 backdrop-blur-sm'>
          <CardHeader className='text-center space-y-4'>
            <div className='mx-auto w-16 h-16 border rounded-2xl flex items-center justify-center p-4'>
              <Image
                src={'/logo.png'}
                alt='Logo'
                width={32}
                height={32}
                className='w-full h-full object-contain'
              />
            </div>
            <CardTitle className='text-2xl font-bold bg-primary bg-clip-text text-transparent'>
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className='text-muted-foreground'>
              Faça login em sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleLogin} className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='seu@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='h-11 bg-background/50 border-border/50 focus:border-primary transition-colors'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium'>
                  Senha
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='h-11 bg-background/50 border-border/50 focus:border-primary transition-colors'
                />
              </div>
              <Button
                type='submit'
                className='w-full h-11 bg-primary  hover:opacity-90 transition-opacity'
                disabled={loading}
              >
                {loading ? (
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
