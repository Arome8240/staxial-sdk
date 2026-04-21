# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2024-01-20

### Added
- Hospital Registry SDK module with functions to interact with hospital contracts
  - `getHospital()` - Get hospital details by ID
  - `getHospitalByPrincipal()` - Get hospital by owner address
  - `isHospitalVerified()` - Check hospital verification status
  - `getHospitalSpecialties()` - Get all specialties for a hospital
  - `getMinStake()` - Get minimum stake requirement
  
- Patient Records SDK module for medical record management
  - `getPatient()` - Get patient information
  - `isPatientRegistered()` - Check patient registration
  - `getMedicalRecord()` - Get medical record by ID
  - `getPatientRecords()` - Get all records for a patient
  - `hasAccess()` - Check hospital access permissions
  
- Appointments SDK module for appointment management
  - `getAppointment()` - Get appointment details
  - `getPatientAppointments()` - Get all patient appointments
  - `getHospitalAppointments()` - Get all hospital appointments
  - `getPlatformFee()` - Get platform fee percentage
  
- Prescriptions SDK module for prescription handling
  - `getPrescription()` - Get prescription details
  - `getMedication()` - Get medication information
  - `getPatientPrescriptions()` - Get all patient prescriptions
  - `getPharmacy()` - Get pharmacy details
  - `isPrescriptionValid()` - Check prescription validity

- Helper utilities for contract calls
  - `callContract()` - Generic contract call helper
  - `extractValue()` - Extract values from Clarity responses

### Changed
- Updated package description to reflect health system focus
- Enhanced README with comprehensive API documentation
- Added more keywords for better npm discoverability
- Improved TypeScript type safety across all modules

### Fixed
- Resolved all ESLint warnings and errors
- Fixed TypeScript type issues with proper type assertions
- Removed unused imports
- Replaced `any` types with proper type definitions

## [0.1.0] - 2024-01-01

### Added
- Initial release
- Basic Stacks blockchain utilities
- Configuration management
- Block height and balance fetching
- Utility functions for STX conversion
- Constants for block timing
