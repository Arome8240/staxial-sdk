import { principalCV, uintCV } from '@stacks/transactions';
import type { StaxialConfig } from './config';
import { callContract, extractValue } from './helpers';

export interface Appointment {
  id: number;
  patient: string;
  hospital: string;
  doctor: string;
  scheduledTime: number;
  duration: number;
  fee: bigint;
  platformFee: bigint;
  status: string;
  notes?: string;
  createdAt: number;
}

export async function getAppointment(
  config: StaxialConfig,
  appointmentId: number
): Promise<Appointment | null> {
  const response = await callContract(
    config,
    'appointments',
    'get-appointment',
    [uintCV(appointmentId)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    id: appointmentId,
    patient: value.patient as string,
    hospital: value.hospital as string,
    doctor: value.doctor as string,
    scheduledTime: value['scheduled-time'] as number,
    duration: value.duration as number,
    fee: BigInt(value.fee as string | number),
    platformFee: BigInt(value['platform-fee'] as string | number),
    status: value.status as string,
    notes: (value.notes as string) || undefined,
    createdAt: value['created-at'] as number,
  };
}

export async function getPatientAppointmentCount(
  config: StaxialConfig,
  patient: string
): Promise<number> {
  const response = await callContract(
    config,
    'appointments',
    'get-patient-appointment-count',
    [principalCV(patient)]
  );
  const value = response.value as Record<string, unknown>;
  return (value?.count as number) || 0;
}

export async function getPlatformFee(config: StaxialConfig): Promise<number> {
  const response = await callContract(config, 'appointments', 'get-platform-fee');
  return (response.value as unknown as number) || 0;
}
