import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { checkTranscriptionStatus } from '../services/recordingService';

interface Props {
  recordingId: string;
  token: string;
}

export default function TranscriptionStatus({ recordingId, token }: Props) {
  const [status, setStatus] = useState<'pending' | 'completed' | 'error'>('pending');
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const data = await checkTranscriptionStatus(recordingId, token);
        setStatus(data.status);
        setTranscription(data.transcription);
        
        if (data.status === 'pending') {
          interval = setTimeout(checkStatus, 3000); // Check every 3 seconds
        }
      } catch (error) {
        setStatus('error');
        console.error('Error checking status:', error);
      }
    };

    checkStatus();

    return () => clearTimeout(interval);
  }, [recordingId, token]);

  return (
    <View style={{ marginVertical: 10 }}>
      {status === 'pending' && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={{ marginLeft: 8 }}>Processing transcription...</Text>
        </View>
      )}
      
      {status === 'completed' && (
        <View>
          <Text style={{ fontWeight: 'bold' }}>Transcription:</Text>
          <Text>{transcription}</Text>
        </View>
      )}
      
      {status === 'error' && (
        <Text style={{ color: 'red' }}>Failed to load transcription</Text>
      )}
    </View>
  );
}