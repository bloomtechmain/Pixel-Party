import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Room, ApiResponse } from '../types';

export function RoomPage() {
  const { code } = useParams<{ code: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) return;
    api.get<ApiResponse<Room>>(`/rooms/${code}`)
      .then(({ data }) => setRoom(data.data ?? null))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      Loading room...
    </div>
  );

  if (!room) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
      Room not found.{' '}
      <button onClick={() => navigate('/rooms')} className="underline text-primary-400 ml-1">Go back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/rooms')} className="text-gray-400 hover:text-white transition">
            ← Rooms
          </button>
          <span className="font-mono text-sm text-gray-400">Code: <span className="text-primary-400 font-bold">{room.code}</span></span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2">{room.name}</h1>
        <p className="text-gray-400 mb-8">Hosted by <span className="text-primary-400">{room.host_username}</span></p>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Players</h2>
            <span className={`text-sm ${room.player_count >= room.max_players ? 'text-red-400' : 'text-green-400'}`}>
              {room.player_count}/{room.max_players}
            </span>
          </div>
          <p className="text-gray-500 text-sm">Real-time player list coming soon...</p>
        </div>
      </main>
    </div>
  );
}
