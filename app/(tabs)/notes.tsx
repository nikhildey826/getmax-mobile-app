import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import NoteItem from '../components/NoteItem';
import { notes } from '../constants/mockData';
import { useTheme } from '../contexts/ThemeContext';

const MedicalNotes = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => 
    note.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.codes.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>MediDictate</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>AI-Powered Documentation</Text>
      </View>

      <TextInput
        style={[styles.searchInput, { 
          backgroundColor: colors.inputBackground,
          color: colors.text,
          borderColor: colors.border 
        }]}
        placeholder="Search notes..."
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteItem note={item} />}
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
  searchInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
});

export default MedicalNotes;