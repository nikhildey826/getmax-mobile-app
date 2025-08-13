import React, { createContext, useContext, useState } from 'react';
import { Patient } from '../types/types';

type PatientContextType = {
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  return (
    <PatientContext.Provider value={{ currentPatient, setCurrentPatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};