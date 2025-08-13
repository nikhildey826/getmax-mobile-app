import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { colors, darkMode, toggleDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>MediDictate</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>AI-Powered Documentation</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>General</Text>
        
        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.buttonText}
          />
        </View>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.settingText, { color: colors.text }]}>Auto-save</Text>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.buttonText}
          />
        </View>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.settingText, { color: colors.text }]}>Notifications</Text>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.buttonText}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Privacy & Security</Text>
        
        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.settingText, { color: colors.text }]}>HIPAA Compliance</Text>
          <Text style={[styles.settingStatus, { color: colors.success }]}>Enabled</Text>
        </View>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.settingText, { color: colors.text }]}>Data Encryption</Text>
          <Text style={[styles.settingStatus, { color: colors.success }]}>Active</Text>
        </View>

        <View style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}>
          <Text style={[styles.settingText, { color: colors.text }]}>Audit Logging</Text>
          <Text style={[styles.settingStatus, { color: colors.success }]}>Enabled</Text>
        </View>
      </View>
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingText: {
    fontSize: 16,
  },
  settingStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Settings;