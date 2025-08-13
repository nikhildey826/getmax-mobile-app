import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text, Easing } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const API_BASE = 'http://10.154.214.207:6000/api';

const RecordingControlButton = ({ userId }: { userId: string }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingTitle, setRecordingTitle] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const durationInterval = useRef<NodeJS.Timeout | null>(null);

  // Pulse animation for recording state
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    scaleAnim.stopAnimation();
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Wave animation effect
  const startWaveAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopWaveAnimation = () => {
    opacityAnim.stopAnimation();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
      startPulseAnimation();
      startWaveAnimation();
      
      // Start recording duration counter
      setRecordingDuration(0);
      durationInterval.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
        durationInterval.current = null;
      }

      stopPulseAnimation();
      stopWaveAnimation();
      
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);

      if (uri) {
        await transcribeRecording(uri, recordingDuration, userId, recordingTitle || `Recording ${new Date().toLocaleString()}`);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const transcribeRecording = async (uri: string, duration: number, userId: string, title: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) throw new Error('Audio file not found');

      const formData = new FormData();
      formData.append('audio', {
        uri,
        name: `recording-${Date.now()}.mp3`,
        type: 'audio/mp3',
      } as any);
      formData.append('duration', duration.toString());
      formData.append('patientId', userId);
      formData.append('title', title);

      await axios.post(`${API_BASE}/transcribe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Reset after successful transcription
      setRecordingDuration(0);
      setRecordingTitle('');
    } catch (error) {
      console.error('Transcription error:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      {isRecording && (
        <View style={styles.recordingInfo}>
          <Animated.View style={[styles.wave, { opacity: opacityAnim }]} />
          <Text style={styles.durationText}>{formatTime(recordingDuration)}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        activeOpacity={0.7}
      >
        <Animated.View style={[
          styles.button,
          isRecording ? styles.recordingButton : styles.defaultButton,
          { transform: [{ scale: scaleAnim }] }
        ]}>
          <View style={[
            styles.innerCircle,
            isRecording ? styles.recordingInnerCircle : styles.defaultInnerCircle
          ]} />
        </Animated.View>
      </TouchableOpacity>

      {!isRecording && (
        <Text style={styles.instructionText}>
          Press to start recording
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  defaultButton: {
    backgroundColor: '#f0f0f0',
  },
  recordingButton: {
    backgroundColor: '#ff3b30',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  defaultInnerCircle: {
    backgroundColor: '#ff3b30',
  },
  recordingInnerCircle: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 30,
    height: 30,
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  wave: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 59, 48, 0.3)',
    marginRight: 10,
  },
  durationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  instructionText: {
    marginTop: 15,
    color: '#666',
    fontSize: 16,
  },
});

export default RecordingControlButton;