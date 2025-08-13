// src/services/api.ts

// Define types for API request options
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  // Add other fetch options as needed
}

interface ApiError extends Error {
  status?: number;
}

const API_BASE_URL = 'http://localhost:6001'; // Your backend URL

export const fetchFromBackend = async <T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error: ApiError = new Error(`HTTP error! status: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    // Handle empty responses (like for 204 No Content)
    const contentLength = response.headers.get('Content-Length');
    if (contentLength === '0' || response.status === 204) {
      return {} as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Example usage with typed response:
interface User {
  id: string;
  name: string;
  email: string;
}

// Later in your component or service:
const fetchUsers = async (): Promise<User[]> => {
  return fetchFromBackend<User[]>('/api/users');
};