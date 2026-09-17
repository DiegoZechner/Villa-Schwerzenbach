import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core';

export const rooms = sqliteTable('rooms', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  pricePerNight: integer('pricePerNight').notNull(),
  capacity: integer('capacity').notNull(),
  sizeSqm: integer('sizeSqm').notNull(),
  amenities: text('amenities').notNull(),
  images: text('images').notNull(),
  isActive: integer('isActive', { mode: 'boolean' }).notNull().default(true),
  sortOrder: integer('sortOrder').notNull(),
});

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  roomId: integer('roomId').notNull().references(() => rooms.id),
  guestName: text('guestName').notNull(),
  guestEmail: text('guestEmail').notNull(),
  guestPhone: text('guestPhone'),
  checkIn: text('checkIn').notNull(),
  checkOut: text('checkOut').notNull(),
  numGuests: integer('numGuests').notNull(),
  totalPrice: integer('totalPrice').notNull(),
  status: text('status').notNull().default('pending'),
  stripeSessionId: text('stripeSessionId'),
  stripePaymentIntent: text('stripePaymentIntent'),
  notes: text('notes'),
  createdAt: text('createdAt').notNull(),
});

export const blockedDates = sqliteTable('blockedDates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  roomId: integer('roomId').notNull().references(() => rooms.id),
  date: text('date').notNull(),
  reason: text('reason'),
}, (t) => ({
  unq: unique().on(t.roomId, t.date),
}));

export const roomOccupiedDates = sqliteTable('roomOccupiedDates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  roomId: integer('roomId').notNull().references(() => rooms.id),
  date: text('date').notNull(),
  bookingId: text('bookingId').notNull().references(() => bookings.id),
}, (t) => ({
  unq: unique().on(t.roomId, t.date),
}));
