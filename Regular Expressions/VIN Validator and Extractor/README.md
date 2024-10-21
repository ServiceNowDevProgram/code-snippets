# VIN Validator and Extractor

This JavaScript module provides functionality to validate and extract information from Vehicle Identification Numbers (VINs). It uses a regular expression to ensure the VIN format is correct and extracts various components of the VIN.

## Features

- Validates the format of 17-character VINs
- Extracts VIN components:
  - World Manufacturer Identifier (WMI)
  - Vehicle Descriptor Section (VDS)
  - Check Digit
  - Vehicle Identifier Section (VIS)
  - Model Year
  - Plant Code
  - Sequential Number

## Usage

```javascript
const vinRegex = /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>\d{6}))$/;

function validateAndExtractVIN(vin) {
  // ... (function implementation)
}

// Example usage:
console.log(validateAndExtractVIN('1HGCM82633A004352'));
// Output: {
//   isValid: true,
//   wmi: '1HG',
//   vds: 'CM826',
//   checkDigit: '3',
//   vis: '3A004352',
//   modelYear: 2013,
//   plantCode: 'A',
//   sequentialNumber: '004352'
// }

console.log(validateAndExtractVIN('INVALID_VIN_123'));
// Output: null
```

## Note

This validator checks the format of the VIN but does not perform the complex check digit calculation. For a production system, additional validation steps may be necessary.