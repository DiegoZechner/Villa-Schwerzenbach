import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, roomOccupiedDates, rooms } from '@/db/schema';
import { checkAvailability } from '@/lib/availability';
import { generateBookingId } from '@/lib/utils';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const bookingSchema = z.object({
  roomId: z.number(),
  guestName: z.string().min(1),
  guestEmail: z.string().email(),
  guestPhone: z.string().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  numGuests: z.number().min(1),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const isAvailable = await checkAvailability(data.roomId, data.checkIn, data.checkOut);
    if (!isAvailable) {
      return NextResponse.json({ error: 'Room is not available for selected dates' }, { status: 400 });
    }

    const roomResult = await db.select().from(rooms).where(eq(rooms.id, data.roomId));
    if (roomResult.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    const room = roomResult[0];

    // Calculate nights
    const start = new Date(data.checkIn);
    const end = new Date(data.checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * room.pricePerNight;

    const bookingId = generateBookingId();
    const createdAt = new Date().toISOString();

    await db.transaction(async (tx) => {
      await tx.insert(bookings).values({
        id: bookingId,
        roomId: data.roomId,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone || null,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        numGuests: data.numGuests,
        totalPrice,
        status: 'pending',
        notes: data.notes || null,
        createdAt,
      });

      // Insert occupied dates
      const datesToOccupy = [];
      let currentDate = new Date(start);
      while (currentDate < end) {
        datesToOccupy.push({
          roomId: data.roomId,
          date: currentDate.toISOString().split('T')[0],
          bookingId,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      for (const d of datesToOccupy) {
        await tx.insert(roomOccupiedDates).values(d);
      }
    });

    return NextResponse.json({ bookingId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
