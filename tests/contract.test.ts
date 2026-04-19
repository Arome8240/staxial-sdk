import { describe, it, expect } from 'vitest';
import { createStaxialConfig } from '../src/config';

describe('createStaxialConfig', () => {
  it('creates config with defaults', () => {
    const config = createStaxialConfig({
      network: 'mainnet',
      contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ',
    });

    expect(config.network).toBe('mainnet');
    expect(config.contractName).toBe('staxial');
    expect(config.stacksApiUrl).toBe('https://api.hiro.so');
  });

  it('uses custom contract name', () => {
    const config = createStaxialConfig({
      network: 'testnet',
      contractAddress: 'ST123',
      contractName: 'custom-contract',
    });

    expect(config.contractName).toBe('custom-contract');
    expect(config.contractId).toBe('ST123.custom-contract');
  });
});
