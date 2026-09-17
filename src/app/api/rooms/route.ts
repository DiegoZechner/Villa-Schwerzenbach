import { NextResponse } from 'next/server';
import { db } from '@/db';
import { rooms } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    let result;
    if (slug) {
      result = await db.select().from(rooms).where(eq(rooms.slug, slug));
    } else {
      result = await db.select().from(rooms).where(eq(rooms.isActive, true));
    }
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
