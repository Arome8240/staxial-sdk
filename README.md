# staxial-sdk

TypeScript SDK for interacting with Staxial contracts on the [Stacks](https://stacks.co) blockchain.

## Installation

```bash
npm install staxial-sdk
```

## Quick start

```ts
import { createStaxialConfig, fetchBlockHeight, fetchStxBalance, microToStx } from 'staxial-sdk';

const config = createStaxialConfig({
  network: 'mainnet',
  contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ',
});

// Fetch current block height
const blockHeight = await fetchBlockHeight(config);
console.log(`Current block: ${blockHeight}`);

// Fetch STX balance
const balance = await fetchStxBalance(config, 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ');
console.log(`Balance: ${microToStx(balance)} STX`);
```

## API

### `createStaxialConfig(options)`

Creates a resolved config object required by all SDK functions.

```ts
const config = createStaxialConfig({
  network: 'mainnet',          // 'mainnet' | 'testnet'
  contractAddress: 'SP...',    // deployed contract principal
  contractName: 'staxial',     // optional, default: 'staxial'
  stacksApiUrl: 'https://...',  // optional, defaults to Hiro API
});
```

### Contract functions

| Function | Description |
|---|---|
| `fetchBlockHeight(config)` | Get the current Stacks block height |
| `fetchStxBalance(config, address)` | Fetch account STX balance in micro-STX |
| `callReadOnly(config, functionName, args)` | Call any read-only contract function |

### Utilities

```ts
import { microToStx, stxToMicro, truncateAddress, formatStx, formatDuration } from 'staxial-sdk';

microToStx(1_000_000);                // 1
stxToMicro(1);                        // 1000000n
truncateAddress('SP2J6Z...V9EJ', 6);  // 'SP2J6Z…RV9EJ'
formatStx(1_500_000);                 // '1.5 STX'
formatDuration(144);                  // '1 day'
```

### Constants

```ts
import { MS_PER_BLOCK, BLOCKS_PER_DAY, BLOCKS_PER_WEEK } from 'staxial-sdk';
```

| Constant | Value | Description |
|---|---|---|
| `MS_PER_BLOCK` | `600_000` | Milliseconds per Stacks block |
| `BLOCKS_PER_DAY` | `144` | ~1 day |
| `BLOCKS_PER_WEEK` | `1_008` | ~1 week |
| `BLOCKS_PER_MONTH` | `4_320` | ~1 month |
| `BLOCKS_PER_YEAR` | `52_560` | ~1 year |

## License

MIT
