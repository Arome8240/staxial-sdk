import { describe, it, expect } from 'vitest';
import {
  microToStx,
  stxToMicro,
  truncateAddress,
  formatStx,
  formatDuration,
  validateAddress,
  blocksToMs,
  msToBlocks,
} from '../src/utils';

describe('microToStx', () => {
  it('converts 1_000_000 micro-STX to 1 STX', () => {
    expect(microToStx(1_000_000)).toBe(1);
  });
  it('converts 0 to 0', () => {
    expect(microToStx(0)).toBe(0);
  });
  it('accepts bigint input', () => {
    expect(microToStx(BigInt(2_000_000))).toBe(2);
  });
});

describe('stxToMicro', () => {
  it('converts 1 STX to 1_000_000 micro-STX', () => {
    expect(stxToMicro(1)).toBe(BigInt(1_000_000));
  });
  it('handles decimal amounts', () => {
    expect(stxToMicro(0.5)).toBe(BigInt(500_000));
  });
});

describe('truncateAddress', () => {
  const addr = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ';

  it('truncates a long address', () => {
    const result = truncateAddress(addr);
    expect(result).toContain('…');
    expect(result.length).toBeLessThan(addr.length);
  });
  it('returns short addresses unchanged', () => {
    expect(truncateAddress('SP123')).toBe('SP123');
  });
});

describe('formatStx', () => {
  it('formats micro-STX as readable string', () => {
    expect(formatStx(1_500_000)).toBe('1.5 STX');
  });
});

describe('formatDuration', () => {
  it('formats 1 hour (6 blocks)', () => {
    expect(formatDuration(6)).toBe('1 hour');
  });
  it('formats 1 day (144 blocks)', () => {
    expect(formatDuration(144)).toBe('1 day');
  });
});

describe('validateAddress', () => {
  it('accepts valid mainnet address', () => {
    expect(validateAddress('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ')).toBe(true);
  });
  it('rejects invalid address', () => {
    expect(validateAddress('INVALID')).toBe(false);
  });
});

describe('blocksToMs', () => {
  it('converts blocks to milliseconds', () => {
    expect(blocksToMs(1)).toBe(600_000);
  });
});

describe('msToBlocks', () => {
  it('converts milliseconds to blocks', () => {
    expect(msToBlocks(600_000)).toBe(1);
  });
});
