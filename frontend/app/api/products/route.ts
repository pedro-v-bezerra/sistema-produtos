import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { handleApiResponse } from '@/lib/handleApiResponse';
import { ProductService } from '@/app/services/ProductService';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const res = await ProductService.getAll(token || '');
    const data = handleApiResponse(res);

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  try {
    const res = await ProductService.create(body, token || '');

    const data = handleApiResponse(res);

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
