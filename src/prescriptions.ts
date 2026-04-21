import { uintCV } from '@stacks/transactions';
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
    patient: value.patient as string,
    hospital: value.hospital as string,
    doctor: value.doctor as string,
    issuedAt: value['issued-at'] as number,
    expiresAt: value['expires-at'] as number,
    diagnosis: value.diagnosis as string,
    notes: (value.notes as string) || undefined,
    status: value.status as string,
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
    name: value.name as string,
    dosage: value.dosage as string,
    frequency: value.frequency as string,
    duration: value.duration as string,
    quantity: value.quantity as number,
    instructions: (value.instructions as string) || undefined,
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
    owner: value.owner as string,
    name: value.name as string,
    licenseNumber: value['license-number'] as string,
    location: value.location as string,
    verified: value.verified as boolean,
    active: value.active as boolean,
    registeredAt: value['registered-at'] as number,
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
  return (response.value as unknown as boolean) || false;
}
