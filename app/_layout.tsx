import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../app/contexts/AuthContext';
import { PatientProvider } from '../app/contexts/PatientContext';
import { ThemeProvider } from '../app/contexts/ThemeContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PatientProvider>
          <ThemeProvider>
            <StatusBar style="auto" />
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </PatientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}