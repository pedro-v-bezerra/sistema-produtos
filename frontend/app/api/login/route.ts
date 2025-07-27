import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleApiResponse } from '@/lib/handleApiResponse';
import { AuthService } from '@/app/services/AuthService';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await AuthService.login(body);

    const data = handleApiResponse(response);

    const token = data.data;

    const res = NextResponse.json({ success: true });

    res.cookies.set({
      name: 'token',
      value: String(token),
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
