import { principalCV, uintCV } from '@stacks/transactions';
import type { StaxialConfig } from './config';
import { callContract, extractValue } from './helpers';

export interface Hospital {
  id: number;
  owner: string;
  name: string;
  licenseNumber: string;
  location: string;
  verified: boolean;
  status: string;
  stake: bigint;
  rating: number;
  totalRatings: number;
  registeredAt: number;
}

/**
 * Get hospital details by ID
 */
export async function getHospital(
  config: StaxialConfig,
  hospitalId: number
): Promise<Hospital | null> {
  const response = await callContract(
    config,
    'hospital-registry',
    'get-hospital',
    [uintCV(hospitalId)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    id: hospitalId,
    owner: value.owner as string,
    name: value.name as string,
    licenseNumber: value['license-number'] as string,
    location: value.location as string,
    verified: value.verified as boolean,
    status: value.status as string,
    stake: BigInt(value.stake as string | number),
    rating: value.rating as number,
    totalRatings: value['total-ratings'] as number,
    registeredAt: value['registered-at'] as number,
  };
}

/**
 * Get hospital by principal address
 */
export async function getHospitalByPrincipal(
  config: StaxialConfig,
  owner: string
): Promise<Hospital | null> {
  const response = await callContract(
    config,
    'hospital-registry',
    'get-hospital-by-principal',
    [principalCV(owner)]
  );

  const value = extractValue(response);
  if (!value) return null;

  return {
    id: value.id as number,
    owner: value.owner as string,
    name: value.name as string,
    licenseNumber: value['license-number'] as string,
    location: value.location as string,
    verified: value.verified as boolean,
    status: value.status as string,
    stake: BigInt(value.stake as string | number),
    rating: value.rating as number,
    totalRatings: value['total-ratings'] as number,
    registeredAt: value['registered-at'] as number,
  };
}

/**
 * Get minimum stake required for hospital registration
 */
export async function getMinStake(config: StaxialConfig): Promise<bigint> {
  const response = await callContract(config, 'hospital-registry', 'get-min-stake');
  return BigInt((response.value as unknown as string | number) || 0);
}

/**
 * Check if a hospital is verified and active
 */
export async function isHospitalVerified(
  config: StaxialConfig,
  hospitalId: number
): Promise<boolean> {
  const response = await callContract(
    config,
    'hospital-registry',
    'is-hospital-verified',
    [uintCV(hospitalId)]
  );
  return (response.value as unknown as boolean) || false;
}

/**
 * Get hospital specialty by index
 */
export async function getHospitalSpecialty(
  config: StaxialConfig,
  hospitalId: number,
  index: number
): Promise<string | null> {
  const response = await callContract(
    config,
    'hospital-registry',
    'get-hospital-specialty',
    [uintCV(hospitalId), uintCV(index)]
  );

  return extractValue(response) as string | null;
}

/**
 * Get hospital specialty count
 */
export async function getHospitalSpecialtyCount(
  config: StaxialConfig,
  hospitalId: number
): Promise<number> {
  const response = await callContract(
    config,
    'hospital-registry',
    'get-hospital-specialty-count',
    [uintCV(hospitalId)]
  );

  const value = response.value as Record<string, unknown>;
  return (value?.count as number) || 0;
}

/**
 * Get all specialties for a hospital
 */
export async function getHospitalSpecialties(
  config: StaxialConfig,
  hospitalId: number
): Promise<string[]> {
  const count = await getHospitalSpecialtyCount(config, hospitalId);
  const specialties: string[] = [];

  for (let i = 0; i < count; i++) {
    const specialty = await getHospitalSpecialty(config, hospitalId, i);
    if (specialty) {
      specialties.push(specialty);
    }
  }

  return specialties;
}
