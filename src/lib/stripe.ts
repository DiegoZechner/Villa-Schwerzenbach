import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
  typescript: true,
});

export async function createCheckoutSession(
  bookingId: string,
  totalPrice: number,
  roomName: string,
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'chf',
          product_data: {
            name: `Booking: ${roomName}`,
          },
          unit_amount: totalPrice,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      bookingId,
    },
  });

  return session;
}
