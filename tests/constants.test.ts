import { describe, it, expect } from 'vitest';
import {
  MS_PER_BLOCK,
  BLOCKS_PER_DAY,
  BLOCKS_PER_WEEK,
  BLOCKS_PER_MONTH,
  BLOCKS_PER_YEAR,
} from '../src/constants';

describe('MS_PER_BLOCK', () => {
  it('is 600_000 ms (10 minutes)', () => {
    expect(MS_PER_BLOCK).toBe(600_000);
  });
});

describe('block time constants', () => {
  it('BLOCKS_PER_DAY is 144', () => {
    expect(BLOCKS_PER_DAY).toBe(144);
  });
  it('BLOCKS_PER_WEEK is 1_008', () => {
    expect(BLOCKS_PER_WEEK).toBe(1_008);
  });
  it('BLOCKS_PER_MONTH is 4_320', () => {
    expect(BLOCKS_PER_MONTH).toBe(4_320);
  });
  it('BLOCKS_PER_YEAR is 52_560', () => {
    expect(BLOCKS_PER_YEAR).toBe(52_560);
  });
});
