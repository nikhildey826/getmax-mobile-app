import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const RecentActivity = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Recent Activity</Text>
      
      <View style={[styles.activityItem, { backgroundColor: colors.cardBackground }]}>
        <View style={[styles.initials, { backgroundColor: colors.primary }]}>
          <Text style={styles.initialsText}>JS</Text>
        </View>
        <View style={styles.activityDetails}>
          <Text style={[styles.patientName, { color: colors.text }]}>John Smith</Text>
          <Text style={[styles.activityInfo, { color: colors.textSecondary }]}>
            Cardiology • 2025-07-21
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  initials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initialsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activityDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityInfo: {
    fontSize: 14,
  },
});

export default RecentActivity;