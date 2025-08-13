export interface Recording {
  id: string;
  name: string;
  duration: number;
  createdAt: string;
  // Add other fields as needed
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface AudioRecordingOptions {
  android: {
    extension: string;
    outputFormat: number;
    audioEncoder: number;
  };
  ios?: {
    outputFormat: string;
    audioQuality: number;
    sampleRate: number;
    numberOfChannels: number;
    bitRate: number;
    linearPCMBitDepth?: number;
  };
}