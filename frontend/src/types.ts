export interface Activity {
  id: number;
  title: string;
  category: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  lat: number;
  lng: number;
  description: string;
}

export interface User {
  id: number;
  displayName: string;
  email: string;
}

export interface CreateActivityRequest {
  title: string;
  category: string;
  location: string;
  date: string;
  time: string;
  maxParticipants: number;
  description?: string;
  lat: number;
  lng: number;
  createdByUserId?: number;
}

export interface CreateUserRequest {
  displayName: string;
  email: string;
}
