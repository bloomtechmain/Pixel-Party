import { Room } from '../types';
import { Button } from './Button';

interface RoomCardProps {
  room: Room;
  onJoin: (code: string) => void;
}

export function RoomCard({ room, onJoin }: RoomCardProps) {
  const isFull = room.player_count >= room.max_players;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col gap-3 hover:border-primary-500 transition-colors">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-white text-lg truncate">{room.name}</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded font-mono">{room.code}</span>
      </div>
      <div className="text-sm text-gray-400">
        <span>Host: <span className="text-primary-400">{room.host_username}</span></span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span className={isFull ? 'text-red-400' : 'text-green-400'}>
            {room.player_count}/{room.max_players}
          </span>
          <span>players</span>
        </div>
        <Button
          variant="primary"
          onClick={() => onJoin(room.code)}
          disabled={isFull}
          className="text-sm py-1.5"
        >
          {isFull ? 'Full' : 'Join'}
        </Button>
      </div>
    </div>
  );
}
