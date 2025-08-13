import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DashboardCard from '../components/DashboardCard';
import RecentActivity from '../components/RecentActivity';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>MediDictate</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>AI-Powered Documentation</Text>
      </View>

      <View style={styles.statsContainer}>
        <DashboardCard 
          title="Today's Notes" 
          value="47" 
          change="+8%" 
          icon="file-text" 
        />
        <DashboardCard 
          title="Avg. Time Saved" 
          value="14 min" 
          change="+12%" 
          icon="clock" 
        />
      </View>

      <View style={styles.statsContainer}>
        <DashboardCard 
          title="Coding Accuracy" 
          value="94%" 
          change="+2%" 
          icon="check-circle" 
        />
        <DashboardCard 
          title="Revenue Impact" 
          value="$2,847" 
          change="+15%" 
          icon="dollar-sign" 
        />
      </View>

      <RecentActivity />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Dashboard;