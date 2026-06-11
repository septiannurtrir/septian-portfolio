import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

async function handleRevalidate(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let secret = searchParams.get('secret');

  if (!secret && request.method === 'POST') {
    try {
      const body = await request.json();
      secret = body?.secret ?? null;
    } catch {
      // invalid or missing JSON body
    }
  }

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid token' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/work/bobobox');
  revalidatePath('/side-projects');

  return Response.json({ revalidated: true, timestamp: new Date().toISOString() });
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
