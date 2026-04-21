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
    owner: value.owner,
    name: value.name,
    licenseNumber: value['license-number'],
    location: value.location,
    verified: value.verified,
    status: value.status,
    stake: BigInt(value.stake),
    rating: value.rating,
    totalRatings: value['total-ratings'],
    registeredAt: value['registered-at'],
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
    id: value.id,
    owner: value.owner,
    name: value.name,
    licenseNumber: value['license-number'],
    location: value.location,
    verified: value.verified,
    status: value.status,
    stake: BigInt(value.stake),
    rating: value.rating,
    totalRatings: value['total-ratings'],
    registeredAt: value['registered-at'],
  };
}

/**
 * Get minimum stake required for hospital registration
 */
export async function getMinStake(config: StaxialConfig): Promise<bigint> {
  const response = await callContract(config, 'hospital-registry', 'get-min-stake');
  return BigInt(response.value);
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
  return response.value as boolean;
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

  return extractValue(response);
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

  return response.value.count as number;
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
