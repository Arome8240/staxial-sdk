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
  return (response.value as unknown as boolean) || false;
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
    registered: value.registered as boolean,
    registeredAt: value['registered-at'] as number,
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
    patient: value.patient as string,
    hospital: value.hospital as string,
    recordType: value['record-type'] as string,
    ipfsHash: value['ipfs-hash'] as string,
    timestamp: value.timestamp as number,
    description: value.description as string,
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
  const value = response.value as Record<string, unknown>;
  return (value?.count as number) || 0;
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
  return (response.value as unknown as boolean) || false;
}
