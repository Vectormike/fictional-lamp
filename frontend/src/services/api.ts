const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5173/v1';

export interface ApiError {
  message: string;
  status?: number;
}

export interface Superhero {
  id?: number;
  name: string;
  superpower: string;
  humilityScore: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export const superherosApi = {
  getAll: async (): Promise<PaginatedResponse<Superhero>> => {
    try {
      const response = await fetch(`${API_URL}/superheroes`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch superheroes');
    }
  },

  create: async (superhero: Omit<Superhero, 'id'>): Promise<Superhero> => {
    try {
      console.log('Creating superhero:', superhero);

      const response = await fetch(`${API_URL}/superheroes`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(superhero),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const error = await response.text();
        console.error('Error response:', error);
        throw new Error(error || 'Failed to create superhero');
      }

      const data = await response.json();
      console.log('Success response:', data);
      return data;
    } catch (error) {
      console.error('Create error:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to create superhero',
      );
    }
  },
};
