import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PatientCard from '../components/PatientCard';
import { patients } from '../constants/mockData';
import { useTheme } from '../contexts/ThemeContext';

const Patients = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>MediDictate</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>AI-Powered Documentation</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>156</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Patients</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.statValue, { color: colors.primary }]}>47</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Today</Text>
        </View>
      </View>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.mrn}
        renderItem={({ item }) => <PatientCard patient={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
      />
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 16,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
});

export default Patients;