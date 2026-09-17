import { db } from '@/db';
import { bookings, blockedDates, roomOccupiedDates } from '@/db/schema';
import { and, eq, or, gte, lte, not } from 'drizzle-orm';

export async function checkAvailability(roomId: number, checkIn: string, checkOut: string): Promise<boolean> {
  // Logic to check if there are any conflicting bookings or blocked dates
  const occupied = await db.select().from(roomOccupiedDates)
    .where(
      and(
        eq(roomOccupiedDates.roomId, roomId),
        gte(roomOccupiedDates.date, checkIn),
        lte(roomOccupiedDates.date, checkOut)
      )
    );

  if (occupied.length > 0) return false;

  const blocked = await db.select().from(blockedDates)
    .where(
      and(
        eq(blockedDates.roomId, roomId),
        gte(blockedDates.date, checkIn),
        lte(blockedDates.date, checkOut)
      )
    );

  return blocked.length === 0;
}

export async function getUnavailableDates(roomId: number, month: number, year: number): Promise<string[]> {
  const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month, 0).toISOString().split('T')[0];

  const occupied = await db.select({ date: roomOccupiedDates.date }).from(roomOccupiedDates)
    .where(
      and(
        eq(roomOccupiedDates.roomId, roomId),
        gte(roomOccupiedDates.date, startDate),
        lte(roomOccupiedDates.date, endDate)
      )
    );

  const blocked = await db.select({ date: blockedDates.date }).from(blockedDates)
    .where(
      and(
        eq(blockedDates.roomId, roomId),
        gte(blockedDates.date, startDate),
        lte(blockedDates.date, endDate)
      )
    );

  const unavailable = new Set([
    ...occupied.map(o => o.date),
    ...blocked.map(b => b.date)
  ]);

  return Array.from(unavailable).sort();
}
