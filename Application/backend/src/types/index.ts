export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: number;
  name: string;
  code: string;
  host_id: number;
  max_players: number;
  is_active: number; // SQLite stores booleans as 0/1
  created_at: string;
  host_username?: string;
  player_count?: number;
}

export interface RoomPlayer {
  room_id: number;
  user_id: number;
  joined_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  project_type: string | null;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}
