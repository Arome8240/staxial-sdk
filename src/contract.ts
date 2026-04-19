import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';
import type { ResolvedStaxialConfig } from './config';

/** Fetch the current Stacks block height from the API. */
export async function fetchBlockHeight(config: ResolvedStaxialConfig): Promise<number> {
  try {
    const res = await fetch(`${config.stacksApiUrl}/v2/info`);
    const data = await res.json();
    return Number(data.burn_block_height ?? data.stacks_tip_height ?? 0);
  } catch {
    return 0;
  }
}

/** Fetch account STX balance in micro-STX */
export async function fetchStxBalance(
  config: ResolvedStaxialConfig,
  address: string,
): Promise<bigint> {
  try {
    const res = await fetch(`${config.stacksApiUrl}/v2/accounts/${address}`);
    const data = await res.json();
    return BigInt(data.balance ?? 0);
  } catch {
    return BigInt(0);
  }
}

/**
 * Call a read-only contract function and return the parsed result.
 */
export async function callReadOnly<T = unknown>(
  config: ResolvedStaxialConfig,
  functionName: string,
  functionArgs: unknown[] = [],
): Promise<T | null> {
  try {
    const result = await callReadOnlyFunction({
      network: config.network,
      contractAddress: config.contractAddress,
      contractName: config.contractName,
      functionName,
      functionArgs: functionArgs as any[],
      senderAddress: config.contractAddress,
    });

    const json = cvToJSON(result);
    return json.value as T;
  } catch {
    return null;
  }
}
