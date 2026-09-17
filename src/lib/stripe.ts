import Stripe from 'stripe';

// Use a fallback so the Next.js build doesn't crash on Vercel if the env var is missing
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
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
