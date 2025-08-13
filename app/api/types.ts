// ======================================
// Core API Response Types
// ======================================
export type ApiResponse<T = unknown> = {
  data: T;
  message?: string;
  success: boolean;
  statusCode?: number;
};

export type PaginatedResponse<T = unknown> = ApiResponse<T[]> & {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// ======================================
// Authentication Types
// ======================================
export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  name: string;
  confirmPassword: string;
};

export type AuthResponse = {
  token: string;
  refreshToken: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
};

// ======================================
// Recording Types
// ======================================
export type Recording = {
  id: string;
  title: string;
  duration: number; // in seconds
  audioUrl: string;
  transcription?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: 'processing' | 'completed' | 'failed';
};

export type CreateRecordingDto = {
  title: string;
  audioFile: File | Blob;
  duration: number;
};

export type UpdateRecordingDto = Partial<{
  title: string;
  transcription: string;
}>;

// ======================================
// Note Types
// ======================================
export type Note = {
  id: string;
  content: string;
  recordingId?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
};

export type CreateNoteDto = {
  content: string;
  recordingId?: string;
  tags?: string[];
};

export type UpdateNoteDto = Partial<CreateNoteDto>;

// ======================================
// Utility Types
// ======================================
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Nullable<T> = T | null;

export type Dictionary<T> = {
  [key: string]: T;
};

// ======================================
// Frontend-Specific Types
// ======================================
export type AudioRecording = {
  uri: string;
  name: string;
  type: string;
  duration: number;
};

export type RecordingUploadProgress = {
  progress: number;
  totalBytesSent: number;
  totalBytesExpectedToSend: number;
};

// ======================================
// Error Types
// ======================================
export type ApiError = {
  message: string;
  statusCode: number;
  error?: string;
  validationErrors?: Dictionary<string[]>;
};

export type ErrorResponse = {
  error: ApiError;
  success: false;
};