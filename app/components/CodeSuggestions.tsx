import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { icd10Codes } from '../constants/icd10Codes';
import { useTheme } from '../contexts/ThemeContext';

type CodeSuggestionsProps = {
  transcription: string;
  specialty: string;
};

const CodeSuggestions = ({ transcription, specialty }: CodeSuggestionsProps) => {
  const { colors } = useTheme();

  // In a real app, this would come from an NLP model analyzing the transcription
  const suggestedCodes = icd10Codes.filter(code => code.confidence > 85);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Suggested Medical Codes</Text>
      
      <FlatList
        data={suggestedCodes}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={[styles.codeItem, { backgroundColor: colors.cardBackground }]}>
            <Text style={[styles.code, { color: colors.primary }]}>ICD-10 {item.code}</Text>
            <Text style={[styles.confidence, { color: colors.textSecondary }]}>
              Confidence: {item.confidence}%
            </Text>
            <Text style={[styles.description, { color: colors.text }]}>{item.description}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  codeItem: {
    padding: 12,
    borderRadius: 8,
  },
  code: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confidence: {
    fontSize: 14,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
});

export default CodeSuggestions;