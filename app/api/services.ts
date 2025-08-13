import { apiClient } from './client';
import {
  AuthResponse,
  LoginCredentials,
  Recording,
  Note,
  ApiResponse
} from './types';

export const AuthService = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),
  // Add register, logout, etc.
};

export const RecordingService = {
  list: () => apiClient.get<Recording[]>('/recordings'),
  create: (recording: FormData) =>
    apiClient.post<Recording>('/recordings', recording, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export const NoteService = {
  list: () => apiClient.get<Note[]>('/notes'),
  create: (content: string) =>
    apiClient.post<Note>('/notes', { content }),
};