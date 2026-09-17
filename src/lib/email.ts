import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(
  guestEmail: string,
  guestName: string,
  roomName: string,
  checkIn: string,
  checkOut: string
) {
  const html = `
    <div style="font-family: Montserrat, sans-serif; color: #35271f;">
      <h1 style="color: #932b28; font-family: 'Playfair Display', serif;">Booking Confirmation</h1>
      <p>Dear ${guestName},</p>
      <p>Thank you for choosing Villa Schwerzenbach. We are thrilled to confirm your booking for the <strong>${roomName}</strong>.</p>
      <ul>
        <li><strong>Check-in:</strong> ${checkIn}</li>
        <li><strong>Check-out:</strong> ${checkOut}</li>
      </ul>
      <p>A House Full of Life. We look forward to your stay!</p>
    </div>
  `;

  await resend.emails.send({
    from: process.env.CONTACT_EMAIL || 'info@villa-schwerzenbach.ch',
    to: guestEmail,
    subject: 'Your Booking Confirmation - Villa Schwerzenbach',
    html,
  });
}
