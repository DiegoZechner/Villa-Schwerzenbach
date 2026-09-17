import { NextResponse } from 'next/server';
import { db } from '@/db';
import { rooms } from '@/db/schema';
import { auth } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allRooms = await db.select().from(rooms);
    return NextResponse.json(allRooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}
