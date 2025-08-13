import * as FileSystem from 'expo-file-system';
import * as Audio from 'expo-av';
import axios from 'axios';

const API_BASE = 'http://10.154.214.207:6000/api'; // Replace with your backend URL

export const startRecording = async (): Promise<Audio.Recording> => {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    return recording;
  } catch (error) {
    console.error('Failed to start recording:', error);
    throw error;
  }
};

export const stopRecording = async (recording: Audio.Recording): Promise<string> => {
  try {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    return recording.getURI() || '';
  } catch (error) {
    console.error('Failed to stop recording:', error);
    throw error;
  }
};

export const transcribeRecording = async (uri: string, duration: number, userId: string, title: string): Promise<string> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error('Audio file not found');
    }

    const formData = new FormData();
    formData.append('audio', {
      uri,
      name: `recording-${Date.now()}.mp3`,
      type: 'audio/mp3',
    } as any);
    formData.append('duration', duration.toString());
    formData.append('patientId', userId);
    formData.append('title', title);

    const response = await axios.post(`${API_BASE}/transcribe`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.transcription;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
};