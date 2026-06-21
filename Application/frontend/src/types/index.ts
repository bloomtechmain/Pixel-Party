export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface Room {
  id: number;
  name: string;
  code: string;
  host_id: number;
  host_username: string;
  max_players: number;
  player_count: number;
  is_active: boolean;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
