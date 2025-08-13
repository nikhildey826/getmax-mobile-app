export type Patient = {
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

export type MedicalNote = {
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

export type ICD10Code = {
  code: string;
  description: string;
  confidence: number;
};

export type Specialty = {
  id: string;
  name: string;
};