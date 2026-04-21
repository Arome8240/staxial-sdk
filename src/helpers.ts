import { callReadOnlyFunction, cvToJSON, ClarityValue } from '@stacks/transactions';
import type { StaxialConfig } from './config';

interface ClarityResponse {
  type: string;
  value?: Record<string, unknown>;
}

/**
 * Helper to call read-only contract functions
 */
export async function callContract(
  config: StaxialConfig,
  contractName: string,
  functionName: string,
  functionArgs: ClarityValue[] = []
): Promise<ClarityResponse> {
  const result = await callReadOnlyFunction({
    contractAddress: config.contractAddress,
    contractName,
    functionName,
    functionArgs,
    network: config.network,
    senderAddress: config.contractAddress,
  });

  const json = cvToJSON(result);
  return json as ClarityResponse;
}

/**
 * Extract value from Clarity response, handling optional types
 */
export function extractValue(response: ClarityResponse): Record<string, unknown> | null {
  if (response.type === 'none' || !response.value) {
    return null;
  }
  return response.value as Record<string, unknown>;
}
