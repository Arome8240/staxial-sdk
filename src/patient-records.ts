import { principalCV, uintCV } from '@stacks/transactions';
import type { StaxialConfig } from './config';
import { callContract, extractValue } from './helpers';

export interface Patient {
  registered: boolean;
  registeredAt: number;
}

export interface MedicalRecord {
  id: number;
  patient: string;
  hospital: string;
  recordType: string;
  ipfsHash: string;
  timestamp: number;
  description: string;
}

export interface Consent {
  granted: boolean;
  grantedAt?: number;
  revokedAt?: number;
}

export async function isPatientRegistered(
  config: StaxialConfig,
  patient: string
): Promise<boolean> {
  const response = await callContract(
    config,
    'patient-records',
    'is-patient-registered',
    [principalCV(patient)]
  );
  return response.value as boolean;
}

export async function getPatient(
  config: StaxialConfig,
  patient: string
): Promise<Patient | null> {
  const response = await callContract(
    config,
    'patient-records',
    'get-patient',
    [principalCV(patient)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    registered: value.registered,
    registeredAt: value['registered-at'],
  };
}

export async function getMedicalRecord(
  config: StaxialConfig,
  recordId: number
): Promise<MedicalRecord | null> {
  const response = await callContract(
    config,
    'patient-records',
    'get-medical-record',
    [uintCV(recordId)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    id: recordId,
    patient: value.patient,
    hospital: value.hospital,
    recordType: value['record-type'],
    ipfsHash: value['ipfs-hash'],
    timestamp: value.timestamp,
    description: value.description,
  };
}

export async function getPatientRecordCount(
  config: StaxialConfig,
  patient: string
): Promise<number> {
  const response = await callContract(
    config,
    'patient-records',
    'get-patient-record-count',
    [principalCV(patient)]
  );
  return response.value.count as number;
}

export async function hasAccess(
  config: StaxialConfig,
  patient: string,
  hospital: string
): Promise<boolean> {
  const response = await callContract(
    config,
    'patient-records',
    'has-access',
    [principalCV(patient), principalCV(hospital)]
  );
  return response.value as boolean;
}
