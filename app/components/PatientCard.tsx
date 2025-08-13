import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type PatientCardProps = {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    mrn: string;
    phone: string;
    email: string;
    lastVisit: string;
    conditions: string[];
    activeConditions: number;
  };
};

const PatientCard = ({ patient }: PatientCardProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.text }]}>
          {patient.name}
        </Text>
        <Text style={[styles.demographics, { color: colors.textSecondary }]}>
          {patient.age} years old, {patient.gender}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="badge" size={16} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.text }]}>MRN: {patient.mrn}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="phone" size={16} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.text }]}>{patient.phone}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="email" size={16} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.text }]}>{patient.email}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="event" size={16} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.text }]}>
          Last visit: {patient.lastVisit}
        </Text>
      </View>

      {patient.conditions.length > 0 && (
        <View style={styles.conditionsContainer}>
          <Text style={[styles.conditionsTitle, { color: colors.text }]}>
            Conditions:
          </Text>
          <View style={styles.conditionsList}>
            {patient.conditions.map((condition, index) => (
              <View 
                key={index} 
                style={[styles.conditionBadge, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.conditionText}>{condition}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.activeConditions, { color: colors.textSecondary }]}>
            {patient.activeConditions} active
          </Text>
        </View>
      )}

      <TouchableOpacity 
        style={[styles.viewButton, { backgroundColor: colors.primary }]}
      >
        <Text style={[styles.viewButtonText, { color: colors.buttonText }]}>
          View Patient
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  demographics: {
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
  conditionsContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  conditionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  conditionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  conditionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  conditionText: {
    color: 'white',
    fontSize: 12,
  },
  activeConditions: {
    fontSize: 12,
  },
  viewButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PatientCard;