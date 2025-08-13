import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { RecordingService } from '../api/services';
import { Recording } from '../api/types';
import TranscriptionStatus from '../components/TranscriptionStatus';

export default function RecordingsScreen() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get this from your auth context or storage
  const userToken = 'your-user-token'; 

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await RecordingService.getAll();
        setRecordings(response.data.data);
      } catch (error) {
        console.error(error);
        setError('Failed to load recordings');
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={recordings}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
            <Text style={{ color: 'gray', marginBottom: 8 }}>{item.duration} seconds</Text>
            <TranscriptionStatus 
              recordingId={item.id} 
              token={userToken} 
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No recordings found</Text>
          </View>
        }
      />
    </View>
  );
}