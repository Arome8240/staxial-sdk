# staxial-sdk

TypeScript SDK for interacting with Staxial Health contracts on the [Stacks](https://stacks.co) blockchain.

## Features

- 🏥 **Hospital Registry** - Manage hospital registrations and verifications
- 📋 **Patient Records** - Secure medical records with access control
- 📅 **Appointments** - Book and manage appointments
- 💊 **Prescriptions** - Issue and track prescriptions
- 🔐 **Type-safe** - Full TypeScript support with comprehensive types
- 🚀 **Easy to use** - Simple, intuitive API

## Installation

```bash
npm install staxial-sdk
```

## Quick start

```ts
import { 
  createStaxialConfig, 
  getHospital,
  getPatient,
  getAppointment 
} from 'staxial-sdk';

const config = createStaxialConfig({
  network: 'testnet',
  contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
});

// Get hospital information
const hospital = await getHospital(config, 1);
console.log(`Hospital: ${hospital?.name}`);

// Check patient registration
const patient = await getPatient(config, 'ST2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ');
console.log(`Registered: ${patient?.registered}`);

// Get appointment details
const appointment = await getAppointment(config, 1);
console.log(`Status: ${appointment?.status}`);
```

## API Reference

### Configuration

```ts
const config = createStaxialConfig({
  network: 'mainnet' | 'testnet',
  contractAddress: 'SP...',
  contractName: 'staxial',  // optional
  stacksApiUrl: 'https://...', // optional
});
```

### Hospital Registry

| Function | Description |
|---|---|
| `getHospital(config, id)` | Get hospital details by ID |
| `getHospitalByPrincipal(config, address)` | Get hospital by owner address |
| `isHospitalVerified(config, id)` | Check if hospital is verified |
| `getHospitalSpecialties(config, id)` | Get all specialties for a hospital |
| `getMinStake(config)` | Get minimum stake required |

### Patient Records

| Function | Description |
|---|---|
| `getPatient(config, address)` | Get patient information |
| `isPatientRegistered(config, address)` | Check if patient is registered |
| `getMedicalRecord(config, id)` | Get medical record by ID |
| `getPatientRecords(config, address)` | Get all records for a patient |
| `hasAccess(config, patient, hospital)` | Check if hospital has access |

### Appointments

| Function | Description |
|---|---|
| `getAppointment(config, id)` | Get appointment details |
| `getPatientAppointments(config, address)` | Get all appointments for patient |
| `getHospitalAppointments(config, address)` | Get all appointments for hospital |
| `getPlatformFee(config)` | Get platform fee percentage |

### Prescriptions

| Function | Description |
|---|---|
| `getPrescription(config, id)` | Get prescription details |
| `getMedication(config, prescriptionId, index)` | Get medication details |
| `getPatientPrescriptions(config, address)` | Get all prescriptions for patient |
| `getPharmacy(config, id)` | Get pharmacy details |
| `isPrescriptionValid(config, id)` | Check if prescription is valid |

### Utilities

```ts
import { 
  microToStx, 
  stxToMicro, 
  truncateAddress, 
  formatStx, 
  formatDuration 
} from 'staxial-sdk';

microToStx(1_000_000);                // 1
stxToMicro(1);                        // 1000000n
truncateAddress('SP2J6Z...V9EJ', 6);  // 'SP2J6Z…RV9EJ'
formatStx(1_500_000);                 // '1.5 STX'
formatDuration(144);                  // '1 day'
```

### Constants

```ts
import { 
  MS_PER_BLOCK, 
  BLOCKS_PER_DAY, 
  BLOCKS_PER_WEEK 
} from 'staxial-sdk';
```

| Constant | Value | Description |
|---|---|---|
| `MS_PER_BLOCK` | `600_000` | Milliseconds per Stacks block |
| `BLOCKS_PER_DAY` | `144` | ~1 day |
| `BLOCKS_PER_WEEK` | `1_008` | ~1 week |
| `BLOCKS_PER_MONTH` | `4_320` | ~1 month |
| `BLOCKS_PER_YEAR` | `52_560` | ~1 year |

## Examples

### Check Hospital Status

```ts
const hospital = await getHospital(config, 1);
if (hospital?.verified && hospital.status === 'active') {
  console.log(`${hospital.name} is verified and active`);
  console.log(`Rating: ${hospital.rating}/5`);
}
```

### Get Patient Medical Records

```ts
const records = await getPatientRecords(config, patientAddress);
for (const record of records) {
  console.log(`${record.recordType}: ${record.description}`);
  console.log(`IPFS: ${record.ipfsHash}`);
}
```

### Check Appointment Status

```ts
const appointment = await getAppointment(config, appointmentId);
console.log(`Patient: ${appointment?.patient}`);
console.log(`Hospital: ${appointment?.hospital}`);
console.log(`Status: ${appointment?.status}`);
console.log(`Fee: ${microToStx(appointment?.fee || 0n)} STX`);
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```ts
import type { 
  Hospital, 
  Patient, 
  Appointment, 
  Prescription 
} from 'staxial-sdk';
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
