import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type NoteItemProps = {
  note: {
    id: string;
    patientName: string;
    specialty: string;
    date: string;
    time?: string;
    status: 'completed' | 'draft' | 'processing';
    codes?: string[];
    duration?: string;
    provider?: string;
  };
};

const NoteItem = ({ note }: NoteItemProps) => {
  const { colors } = useTheme();

  const statusColor = {
    completed: colors.success,
    draft: colors.warning,
    processing: colors.info,
  }[note.status];

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.patientName, { color: colors.text }]}>{note.patientName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{note.status}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text style={[styles.detailText, { color: colors.text }]}>{note.specialty}</Text>
        <Text style={[styles.detailText, { color: colors.text }]}>
          {note.date} {note.time ? `at ${note.time}` : ''}
        </Text>
      </View>

      {note.codes && (
        <View style={styles.codesContainer}>
          {note.codes.map((code, index) => (
            <View key={index} style={[styles.codeBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.codeText}>{code}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        {note.duration && (
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Duration: {note.duration}
          </Text>
        )}
        {note.provider && (
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Provider: {note.provider}
          </Text>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="visibility" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="edit" size={20} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.primary }]}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
  },
  codesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  codeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  codeText: {
    color: 'white',
    fontSize: 12,
  },
  footer: {
    marginBottom: 12,
  },
  footerText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default NoteItem;