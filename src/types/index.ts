export interface Room {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  pricePerNight: number;
  capacity: number;
  sizeSqm: number;
  amenities: string[];
  images: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface Booking {
  id: string;
  roomId: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  checkIn: string;
  checkOut: string;
  numGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  stripeSessionId: string | null;
  stripePaymentIntent: string | null;
  notes: string | null;
  createdAt: string;
}

export interface BookingFormData {
  roomId: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  numGuests: number;
  notes?: string;
}
