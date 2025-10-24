// IPv6 Address Validator
// This regex validates both full and compressed IPv6 address formats, including shorthand "::" notation.

const ipv6Regex =
  /^(?:(([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:)|(([0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,5}(:[0-9A-Fa-f]{1,4}){1,2})|(([0-9A-Fa-f]{1,4}:){1,4}(:[0-9A-Fa-f]{1,4}){1,3})|(([0-9A-Fa-f]{1,4}:){1,3}(:[0-9A-Fa-f]{1,4}){1,4})|(([0-9A-Fa-f]{1,4}:){1,2}(:[0-9A-Fa-f]{1,4}){1,5})|([0-9A-Fa-f]{1,4}:((:[0-9A-Fa-f]{1,4}){1,6}))|(:((:[0-9A-Fa-f]{1,4}){1,7}|:)))(%.+)?$/;

function validateIPv6(address) {
  return ipv6Regex.test(address);
}

// Example usage:
console.log(validateIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334")); // true (full)
console.log(validateIPv6("2001:db8:85a3::8a2e:370:7334")); // true (compressed)
console.log(validateIPv6("::1")); // true (loopback)
console.log(validateIPv6("fe80::")); // true (link-local)
console.log(validateIPv6("1234:5678:9abc:def0:1234:5678:9abc:defg")); // false (invalid hex)
console.log(validateIPv6("2001::85a3::7334")); // false (double compression)
