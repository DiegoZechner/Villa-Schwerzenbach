import { NextResponse } from 'next/server';
import { checkAvailability, getUnavailableDates } from '@/lib/availability';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = parseInt(searchParams.get('roomId') || '0', 10);
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const month = parseInt(searchParams.get('month') || new Date().getMonth() + 1 + '', 10);
  const year = parseInt(searchParams.get('year') || new Date().getFullYear() + '', 10);

  if (!roomId) {
    return NextResponse.json({ error: 'roomId is required' }, { status: 400 });
  }

  try {
    if (checkIn && checkOut) {
      const available = await checkAvailability(roomId, checkIn, checkOut);
      return NextResponse.json({ available });
    } else {
      const unavailableDates = await getUnavailableDates(roomId, month, year);
      return NextResponse.json({ unavailableDates });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
