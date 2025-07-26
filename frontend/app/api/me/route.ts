// app/api/me/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
  }

  // Você pode decodificar o token e retornar os dados aqui
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString()
  );

  return NextResponse.json({ email: payload.email });
}