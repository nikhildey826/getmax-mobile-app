import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type DashboardCardProps = {
  title: string;
  value: string;
  change: string;
  icon: string;
};

const DashboardCard = ({ title, value, change, icon }: DashboardCardProps) => {
  const { colors } = useTheme();
  const isPositive = change.startsWith('+');

  return (
    <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
        <MaterialIcons 
          name={icon as any} 
          size={20} 
          color={colors.textSecondary} 
        />
      </View>
      
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      
      <View style={styles.changeContainer}>
        <Text style={[
          styles.changeText, 
          { 
            color: isPositive ? colors.success : colors.danger,
            backgroundColor: isPositive ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
          }
        ]}>
          {change}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  changeContainer: {
    alignSelf: 'flex-start',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default DashboardCard;