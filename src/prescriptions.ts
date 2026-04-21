import { principalCV, uintCV } from '@stacks/transactions';
import type { StaxialConfig } from './config';
import { callContract, extractValue } from './helpers';

export interface Prescription {
  id: number;
  patient: string;
  hospital: string;
  doctor: string;
  issuedAt: number;
  expiresAt: number;
  diagnosis: string;
  notes?: string;
  status: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions?: string;
}

export interface Pharmacy {
  id: number;
  owner: string;
  name: string;
  licenseNumber: string;
  location: string;
  verified: boolean;
  active: boolean;
  registeredAt: number;
}

export async function getPrescription(
  config: StaxialConfig,
  prescriptionId: number
): Promise<Prescription | null> {
  const response = await callContract(
    config,
    'prescriptions',
    'get-prescription',
    [uintCV(prescriptionId)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    id: prescriptionId,
    patient: value.patient,
    hospital: value.hospital,
    doctor: value.doctor,
    issuedAt: value['issued-at'],
    expiresAt: value['expires-at'],
    diagnosis: value.diagnosis,
    notes: value.notes || undefined,
    status: value.status,
  };
}

export async function getMedication(
  config: StaxialConfig,
  prescriptionId: number,
  medicationIndex: number
): Promise<Medication | null> {
  const response = await callContract(
    config,
    'prescriptions',
    'get-medication',
    [uintCV(prescriptionId), uintCV(medicationIndex)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    name: value.name,
    dosage: value.dosage,
    frequency: value.frequency,
    duration: value.duration,
    quantity: value.quantity,
    instructions: value.instructions || undefined,
  };
}

export async function getPharmacy(
  config: StaxialConfig,
  pharmacyId: number
): Promise<Pharmacy | null> {
  const response = await callContract(
    config,
    'prescriptions',
    'get-pharmacy',
    [uintCV(pharmacyId)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    id: pharmacyId,
    owner: value.owner,
    name: value.name,
    licenseNumber: value['license-number'],
    location: value.location,
    verified: value.verified,
    active: value.active,
    registeredAt: value['registered-at'],
  };
}

export async function isPrescriptionValid(
  config: StaxialConfig,
  prescriptionId: number
): Promise<boolean> {
  const response = await callContract(
    config,
    'prescriptions',
    'is-prescription-valid',
    [uintCV(prescriptionId)]
  );
  return response.value as boolean;
}
