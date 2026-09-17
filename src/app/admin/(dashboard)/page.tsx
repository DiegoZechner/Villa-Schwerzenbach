import { db } from '@/db';
import { bookings, rooms } from '@/db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export default async function AdminDashboard() {
  const today = new Date().toISOString().split('T')[0];
  
  const todayCheckins = await db.select().from(bookings).where(
    and(
      eq(bookings.checkIn, today),
      eq(bookings.status, 'confirmed')
    )
  );

  const todayCheckouts = await db.select().from(bookings).where(
    and(
      eq(bookings.checkOut, today),
      eq(bookings.status, 'confirmed')
    )
  );

  const pendingBookings = await db.select().from(bookings).where(
    eq(bookings.status, 'pending')
  );

  const allRooms = await db.select().from(rooms);
  const confirmedBookings = await db.select().from(bookings).where(
    eq(bookings.status, 'confirmed')
  );
  const occupancyRate = allRooms.length > 0 
    ? Math.round((confirmedBookings.length / allRooms.length) * 100) 
    : 0;

  const recentBookings = await db.select().from(bookings).limit(10);

  return (
    <div>
      <h1 className="text-3xl font-bold text-espresso font-serif mb-6">Willkommen im Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <p className="text-sm font-medium text-gray-500 truncate">Heutige Check-ins</p>
            <p className="mt-1 text-3xl font-semibold text-villa-red">{todayCheckins.length}</p>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <p className="text-sm font-medium text-gray-500 truncate">Heutige Check-outs</p>
            <p className="mt-1 text-3xl font-semibold text-villa-blue">{todayCheckouts.length}</p>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <p className="text-sm font-medium text-gray-500 truncate">Offene Buchungen</p>
            <p className="mt-1 text-3xl font-semibold text-yellow-600">{pendingBookings.length}</p>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <p className="text-sm font-medium text-gray-500 truncate">Belegungsrate</p>
            <p className="mt-1 text-3xl font-semibold text-bordeaux">{occupancyRate}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 font-serif">Neueste Buchungen</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Noch keine Buchungen vorhanden.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buchungs-Nr</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gast</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Zeitraum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.guestName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.checkIn} – {booking.checkOut}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {booking.status === 'pending' ? 'Ausstehend' : booking.status === 'confirmed' ? 'Bestätigt' : 'Storniert'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
