'use client';

import { useState, useEffect } from 'react';
import BlockDatesModal from './BlockDatesModal';

type Room = {
  id: string;
  name: string;
  isActive: boolean;
};

export default function RoomManager() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/admin/rooms');
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      }
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/rooms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      if (res.ok) {
        fetchRooms();
      }
    } catch (error) {
      console.error('Failed to update room:', error);
    }
  };

  if (loading) return <div>Lade Zimmer...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white shadow rounded-lg p-6 border-t-4 border-[#35271f]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#35271f] font-playfair">{room.name || `Zimmer ${room.id}`}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${room.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {room.isActive ? 'Aktiv' : 'Inaktiv'}
              </span>
            </div>
            
            <div className="flex flex-col space-y-3 mt-6">
              <button
                onClick={() => toggleStatus(room.id, room.isActive)}
                className={`w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
                  room.isActive 
                    ? 'border-red-300 text-red-700 bg-white hover:bg-red-50' 
                    : 'border-transparent text-white bg-[#6b889f] hover:bg-[#5a748a]'
                }`}
              >
                {room.isActive ? 'Deaktivieren' : 'Aktivieren'}
              </button>
              
              <button
                onClick={() => setSelectedRoom(room)}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#35271f] hover:bg-[#4b1716]"
              >
                Zeitraum blockieren
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <BlockDatesModal 
          room={selectedRoom} 
          onClose={() => setSelectedRoom(null)} 
        />
      )}
    </div>
  );
}
