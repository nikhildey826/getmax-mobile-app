import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const AudioRecorder = ({ onRecordingComplete, isRecording, setIsRecording }) => {
  const { colors } = useTheme();
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      setRecordingTime(0);
      waveAnim.stopAnimation();
    }

    return () => {
      if (interval) clearInterval(interval);
      waveAnim.stopAnimation();
    };
  }, [isRecording]);

  const handleRecordPress = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic
    } else {
      // Stop recording and process
      onRecordingComplete("Sample transcription from recording...");
    }
  };

  const waveScale = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.recordButton, 
          { 
            backgroundColor: isRecording ? colors.danger : colors.primary,
            shadowColor: colors.primary,
          }
        ]}
        onPress={handleRecordPress}
      >
        <Animated.View style={{ transform: [{ scale: waveScale }] }}>
          <MaterialIcons 
            name={isRecording ? 'stop' : 'mic'} 
            size={32} 
            color={colors.buttonText} 
          />
        </Animated.View>
      </TouchableOpacity>
      
      <Text style={[styles.recordingText, { color: colors.text }]}>
        {isRecording ? `Recording: ${recordingTime}s` : 'Ready to Record'}
      </Text>
      
      {isRecording && (
        <Text style={[styles.hintText, { color: colors.textSecondary }]}>
          Click stop when finished dictating
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
  },
  recordingText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AudioRecorder;