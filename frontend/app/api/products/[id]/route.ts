import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get('token')?.value;
  const { id } = await params;

  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Erro ao buscar produto' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET_PRODUCT_ID]', error);
    return NextResponse.json({ error: 'Erro interno ao buscar produto' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get('token')?.value;
  const body = await req.json();
  const { id } = await params;

  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.error || 'Erro ao atualizar produto' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[PUT_PRODUCT_ID]', error);
    return NextResponse.json({ error: 'Erro interno ao atualizar produto' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get('token')?.value;
  const { id } = await params;
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data = {};
    try {
      data = await res.json();
    } catch (_) {
      data = {};
    }

    if (!res.ok) {
      return NextResponse.json({ error: (data as any).error || 'Erro ao deletar produto' }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[DELETE_PRODUCT_ID]', error);
    return NextResponse.json({ error: 'Erro interno ao deletar produto' }, { status: 500 });
  }
}
