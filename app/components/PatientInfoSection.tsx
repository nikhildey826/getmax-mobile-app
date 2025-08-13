import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type Patient = {
  name: string;
  mrn: string;
  age: string;
  gender: string;
  lastVisit: string;
};

type PatientInfoSectionProps = {
  patient: Patient;
};

const PatientInfoSection = ({ patient }: PatientInfoSectionProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Patient Information</Text>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Patient Name</Text>
        <Text style={[styles.value, { color: colors.text }]}>{patient.name}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>MRN</Text>
        <Text style={[styles.value, { color: colors.text }]}>{patient.mrn}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Age/Gender</Text>
        <Text style={[styles.value, { color: colors.text }]}>{patient.age} / {patient.gender}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Last Visit</Text>
        <Text style={[styles.value, { color: colors.text }]}>{patient.lastVisit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PatientInfoSection;