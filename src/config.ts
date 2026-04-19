export type NetworkName = 'mainnet' | 'testnet';

export interface StaxialConfig {
  network: NetworkName;
  contractAddress: string;
  contractName?: string;
  stacksApiUrl?: string;
}

const DEFAULT_CONTRACT_NAME = 'staxial';
const MAINNET_API = 'https://api.hiro.so';
const TESTNET_API = 'https://api.testnet.hiro.so';

/**
 * Create a resolved Staxial config object from user-supplied options.
 * Pass the returned object into any SDK function that requires a config.
 */
export function createStaxialConfig(config: StaxialConfig) {
  const contractName = config.contractName ?? DEFAULT_CONTRACT_NAME;
  const stacksApiUrl =
    config.stacksApiUrl ?? (config.network === 'mainnet' ? MAINNET_API : TESTNET_API);

  return {
    network: config.network as NetworkName,
    contractAddress: config.contractAddress,
    contractName,
    stacksApiUrl,
    contractId: `${config.contractAddress}.${contractName}`,
  };
}

export type ResolvedStaxialConfig = ReturnType<typeof createStaxialConfig>;
