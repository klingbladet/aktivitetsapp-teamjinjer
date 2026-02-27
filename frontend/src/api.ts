import type { Activity, CreateActivityRequest, CreateUserRequest, User } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5180';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API Error: ${response.statusText}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

export const api = {
  // Activities endpoints
  activities: {
    getAll: async (search?: string, category?: string): Promise<Activity[]> => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category && category !== 'Alla') params.append('category', category);
      
      const response = await fetch(`${API_BASE_URL}/api/activities${params.toString() ? '?' + params.toString() : ''}`);
      return handleResponse(response);
    },

    getById: async (id: number): Promise<Activity> => {
      const response = await fetch(`${API_BASE_URL}/api/activities/${id}`);
      return handleResponse(response);
    },

    create: async (data: CreateActivityRequest): Promise<Activity> => {
      const response = await fetch(`${API_BASE_URL}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    join: async (activityId: number, userId: number): Promise<void> => {
      const response = await fetch(
        `${API_BASE_URL}/api/activities/${activityId}/join?userId=${userId}`,
        {
          method: 'POST',
        }
      );
      return handleResponse(response);
    },

    leave: async (activityId: number, userId: number): Promise<void> => {
      const response = await fetch(
        `${API_BASE_URL}/api/activities/${activityId}/leave?userId=${userId}`,
        {
          method: 'POST',
        }
      );
      return handleResponse(response);
    },
  },

  // Users endpoints
  users: {
    getById: async (id: number): Promise<User> => {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
      return handleResponse(response);
    },

    create: async (data: CreateUserRequest): Promise<User> => {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },
  },
};
