import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/app/services/ProductService';
import { handleApiResponse } from '@/lib/handleApiResponse';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get('token')?.value;
  const { id } = await params;

  try {
    const res = await ProductService.getById(id, token || '');
    const data = handleApiResponse(res);

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
    const res = await ProductService.update(id, body, token || '');
    const data = handleApiResponse(res);

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
    const res = await ProductService.delete(id, token || '');
    const data = handleApiResponse(res);

    return NextResponse.json(data);
  } catch (error) {
    console.error('[DELETE_PRODUCT_ID]', error);
    return NextResponse.json({ error: 'Erro interno ao deletar produto' }, { status: 500 });
  }
}
