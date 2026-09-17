import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blockedDates } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eachDayOfInterval, format } from 'date-fns';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { startDate, endDate, reason } = body;
    
    const roomId = parseInt(id);
    const days = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });

    for (const day of days) {
      const dateStr = format(day, 'yyyy-MM-dd');
      try {
        await db.insert(blockedDates).values({
          roomId,
          date: dateStr,
          reason: reason || null,
        });
      } catch {
        // Skip if already blocked (unique constraint)
      }
    }
      
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to block room dates' }, { status: 500 });
  }
}
