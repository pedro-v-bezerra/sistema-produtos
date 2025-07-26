// app/api/products/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3001/products';

export async function GET() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const res = await fetch(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Erro ao buscar os produtos.' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Erro ao criar o produto.' }, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
