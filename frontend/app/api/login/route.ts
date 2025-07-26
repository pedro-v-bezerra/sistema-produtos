import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Erro ao fazer login' },
        { status: response.status }
      );
    }

    const token = data.token;

    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return res;
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
