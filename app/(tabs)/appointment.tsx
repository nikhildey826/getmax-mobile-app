import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const appointmentsData = [
  {
    id: '1',
    patientName: 'John Smith',
    time: '09:30 AM',
    duration: '30 mins',
    type: 'Follow-up',
    status: 'confirmed',
    notes: 'Diabetes management',
  },
  {
    id: '2',
    patientName: 'Sarah Johnson',
    time: '10:15 AM',
    duration: '15 mins',
    type: 'Vaccination',
    status: 'confirmed',
    notes: 'Flu shot',
  },
  {
    id: '3',
    patientName: 'Michael Chen',
    time: '11:00 AM',
    duration: '45 mins',
    type: 'Consultation',
    status: 'pending',
    notes: 'New patient - hypertension',
  },
];

export default function AppointmentsPage() {
  const { colors } = useTheme();

  const renderAppointmentItem = ({ item }) => (
    <View style={[styles.appointmentCard, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
      <View style={styles.appointmentHeader}>
        <Text style={[styles.timeText, { color: colors.primary }]}>{item.time}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'confirmed' ? colors.success : colors.warning }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={[styles.patientName, { color: colors.text }]}>{item.patientName}</Text>
      <Text style={[styles.appointmentDetail, { color: colors.textSecondary }]}>
        <MaterialIcons name="access-time" size={14} color={colors.textSecondary} /> {item.duration} • {item.type}
      </Text>
      
      {item.notes && (
        <View style={styles.notesContainer}>
          <Feather name="file-text" size={14} color={colors.textSecondary} />
          <Text style={[styles.notesText, { color: colors.textSecondary }]}>{item.notes}</Text>
        </View>
      )}
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.buttonText, { color: colors.primary }]}>Start Note</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.background }]}>
          <Feather name="phone" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Today's Appointments</Text>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={appointmentsData}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  appointmentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
  },
  patientName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  appointmentDetail: {
    fontSize: 14,
    marginBottom: 8,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
});