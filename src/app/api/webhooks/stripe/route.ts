import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/db';
import { bookings, roomOccupiedDates, rooms } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sendBookingConfirmation } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await db.update(bookings).set({ status: 'confirmed', stripePaymentIntent: session.payment_intent as string }).where(eq(bookings.id, bookingId));
        
        const bookingResult = await db.select().from(bookings).where(eq(bookings.id, bookingId));
        const booking = bookingResult[0];
        const roomResult = await db.select().from(rooms).where(eq(rooms.id, booking.roomId));
        
        await sendBookingConfirmation(
          booking.guestEmail,
          booking.guestName,
          roomResult[0].name,
          booking.checkIn,
          booking.checkOut
        );
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.bookingId;

      if (bookingId) {
        await db.delete(roomOccupiedDates).where(eq(roomOccupiedDates.bookingId, bookingId));
        await db.delete(bookings).where(eq(bookings.id, bookingId));
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
