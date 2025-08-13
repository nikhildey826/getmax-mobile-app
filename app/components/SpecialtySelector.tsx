import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { specialties } from '../constants/specialties';
import { useTheme } from '../contexts/ThemeContext';

type SpecialtySelectorProps = {
  selectedSpecialty: string;
  onSelect: (specialty: string) => void;
};

const SpecialtySelector = ({ selectedSpecialty, onSelect }: SpecialtySelectorProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Specialty</Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.specialtiesContainer}
      >
        {specialties.map((specialty) => (
          <TouchableOpacity
            key={specialty.id}
            style={[
              styles.specialtyButton,
              { 
                backgroundColor: selectedSpecialty === specialty.name 
                  ? colors.primary 
                  : colors.cardBackground,
                borderColor: colors.border,
              }
            ]}
            onPress={() => onSelect(specialty.name)}
          >
            <Text 
              style={[
                styles.specialtyText,
                { 
                  color: selectedSpecialty === specialty.name 
                    ? colors.buttonText 
                    : colors.text,
                }
              ]}
            >
              {specialty.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  specialtiesContainer: {
    gap: 8,
    paddingRight: 16,
  },
  specialtyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  specialtyText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SpecialtySelector;