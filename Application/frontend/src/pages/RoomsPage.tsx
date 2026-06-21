import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Room, ApiResponse } from '../types';
import { RoomCard } from '../components/RoomCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const fetchRooms = useCallback(async () => {
    try {
      const { data } = await api.get<ApiResponse<Room[]>>('/rooms');
      setRooms(data.data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRooms(); }, [fetchRooms]);

  async function handleCreate() {
    if (!roomName.trim()) return;
    setCreating(true);
    try {
      const { data } = await api.post<ApiResponse<Room>>('/rooms', { name: roomName });
      if (data.data) navigate(`/rooms/${data.data.code}`);
    } finally {
      setCreating(false);
    }
  }

  async function handleJoin(code: string) {
    await api.post(`/rooms/${code}/join`);
    navigate(`/rooms/${code}`);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-400">Pixel Party</h1>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Create Room'}
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-700 flex gap-3 items-end">
            <Input
              label="Room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="My Awesome Room"
              className="flex-1"
            />
            <Button onClick={handleCreate} isLoading={creating}>Create</Button>
          </div>
        )}

        {loading ? (
          <p className="text-gray-400 text-center py-20">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No active rooms. Be the first to create one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onJoin={handleJoin} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
