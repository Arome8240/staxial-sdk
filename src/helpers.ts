import { callReadOnlyFunction, cvToJSON, ClarityValue } from '@stacks/transactions';
import type { StaxialConfig } from './config';

/**
 * Helper to call read-only contract functions
 */
export async function callContract(
  config: StaxialConfig,
  contractName: string,
  functionName: string,
  functionArgs: ClarityValue[] = []
): Promise<any> {
  const result = await callReadOnlyFunction({
    contractAddress: config.contractAddress,
    contractName,
    functionName,
    functionArgs,
    network: config.network,
    senderAddress: config.contractAddress,
  });

  const json = cvToJSON(result);
  return json;
}

/**
 * Extract value from Clarity response, handling optional types
 */
export function extractValue(response: any): any {
  if (response.type === 'none' || !response.value) {
    return null;
  }
  return response.value;
}
