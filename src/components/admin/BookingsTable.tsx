'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

type Booking = {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  totalPrice: number;
};

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Möchten Sie diese Buchung wirklich stornieren?')) return;
    
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });
      
      if (res.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  if (loading) return <div>Lade Buchungen...</div>;

  return (
    <div>
      <div className="mb-4 flex space-x-4">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#932b28] focus:border-[#932b28] sm:text-sm rounded-md"
        >
          <option value="all">Alle Status</option>
          <option value="pending">Ausstehend</option>
          <option value="confirmed">Bestätigt</option>
          <option value="cancelled">Storniert</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buchungs-Nr</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zimmer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gast</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zeitraum</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Betrag</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.roomId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.guestName || booking.guestEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.checkInDate ? format(new Date(booking.checkInDate), 'dd.MM.yyyy') : ''} - 
                    {booking.checkOutDate ? format(new Date(booking.checkOutDate), 'dd.MM.yyyy') : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.totalPrice} CHF
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {booking.status === 'pending' ? 'Ausstehend' : booking.status === 'confirmed' ? 'Bestätigt' : 'Storniert'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Stornieren
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
