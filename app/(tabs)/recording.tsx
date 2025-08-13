import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AudioRecorder from '../components/AudioRecorder';
import CodeSuggestions from '../components/CodeSuggestions';
import PatientInfoSection from '../components/PatientInfoSection';
import SpecialtySelector from '../components/SpecialtySelector';

const VoiceRecording = () => {
  const { colors } = useTheme();
  const [patient, setPatient] = useState({
    name: 'John Smith',
    mrn: 'MRN001234',
    age: '45',
    gender: 'M',
    lastVisit: '2024-07-15'
  });
  const [selectedSpecialty, setSelectedSpecialty] = useState('General Practice');
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  const handleRecordingComplete = (text: string) => {
    setTranscription(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>MediDictate</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>AI-Powered Documentation</Text>
      </View>

      <PatientInfoSection patient={patient} />

      <SpecialtySelector 
        selectedSpecialty={selectedSpecialty}
        onSelect={setSelectedSpecialty}
      />

      <View style={styles.recordingSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Dictation</Text>
        <AudioRecorder 
          onRecordingComplete={handleRecordingComplete}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />
      </View>

      {transcription && (
        <CodeSuggestions 
          transcription={transcription}
          specialty={selectedSpecialty}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => console.log('Save Draft pressed')}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.danger }]}
          onPress={() => {
            setTranscription('');
            setIsRecording(false);
          }}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  recordingSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VoiceRecording;