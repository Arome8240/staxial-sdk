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
    patient: value.patient,
    hospital: value.hospital,
    doctor: value.doctor,
    scheduledTime: value['scheduled-time'],
    duration: value.duration,
    fee: BigInt(value.fee),
    platformFee: BigInt(value['platform-fee']),
    status: value.status,
    notes: value.notes || undefined,
    createdAt: value['created-at'],
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
  return response.value.count as number;
}

export async function getPlatformFee(config: StaxialConfig): Promise<number> {
  const response = await callContract(config, 'appointments', 'get-platform-fee');
  return response.value as number;
}
