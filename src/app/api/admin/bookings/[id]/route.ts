import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, roomOccupiedDates } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    
    await db.update(bookings)
      .set({ status: body.status })
      .where(eq(bookings.id, id));

    // If cancelling, remove occupied dates
    if (body.status === 'cancelled') {
      await db.delete(roomOccupiedDates).where(eq(roomOccupiedDates.bookingId, id));
    }
      
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}
