import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, rooms } from '@/db/schema';
import { createCheckoutSession } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const checkoutSchema = z.object({
  bookingId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId } = checkoutSchema.parse(body);

    const bookingResult = await db.select().from(bookings).where(eq(bookings.id, bookingId));
    if (bookingResult.length === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    const booking = bookingResult[0];

    const roomResult = await db.select().from(rooms).where(eq(rooms.id, booking.roomId));
    if (roomResult.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    const room = roomResult[0];

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/booking?cancelled=true`;

    const session = await createCheckoutSession(
      bookingId,
      booking.totalPrice,
      room.name,
      successUrl,
      cancelUrl
    );

    await db.update(bookings).set({ stripeSessionId: session.id }).where(eq(bookings.id, bookingId));

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
