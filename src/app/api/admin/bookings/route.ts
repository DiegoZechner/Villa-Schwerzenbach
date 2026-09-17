import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { auth } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allBookings = await db.select().from(bookings);
    return NextResponse.json(allBookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
