// VIN (Vehicle Identification Number) Validator and Extractor

const vinRegex = /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>\d{6}))$/;

function validateAndExtractVIN(vin) {
  const match = vinRegex.exec(vin);
  if (!match) {
    return null;
  }

  const { groups } = match;
  return {
    isValid: true,
    wmi: groups.wmi,
    vds: groups.vds,
    checkDigit: groups.check,
    vis: groups.vis,
    modelYear: decodeModelYear(groups.year),
    plantCode: groups.plant,
    sequentialNumber: groups.seq
  };
}

function decodeModelYear(yearChar) {
  const yearCodes = "ABCDEFGHJKLMNPRSTVWXY123456789";
  const index = yearCodes.indexOf(yearChar);
  return index >= 0 ? 2010 + index : null;
}

// Example usage:
console.log(validateAndExtractVIN('1HGCM82633A004352'));
console.log(validateAndExtractVIN('INVALID_VIN_123'));