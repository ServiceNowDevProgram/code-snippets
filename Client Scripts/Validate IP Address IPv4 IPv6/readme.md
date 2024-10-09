# IP Address Validation Function

## Description
The `checkIPAddress` function validates whether a given string is a valid IPv4 or IPv6 or Invalid address. It also includes a function to check if the string is a valid hexadecimal number.

## Usage
These functions are useful for verifying the format of IP addresses in your application, ensuring that they comply with the standards for IPv4 and IPv6 addresses.

## Examples

### Example 1: IPv4 Validation
```javascript
// Example IPv4 string
let ipv4 = "192.168.0.1";

if (checkIPv4(ipv4)) {
    console.log("String is IPv4");
} else {
    console.log("String is Invalid IPv4");
}
```
This will output: `String is IPv4`.

### Example 2: IPv6 Validation
```javascript
// Example IPv6 string
let ipv6 = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";

if (checkIPv6(ipv6)) {
    console.log("String is IPv6");
} else {
    console.log("String is Invalid IPv6");
```
This will output: `String is IPv6`.

### Example 3: Invalid IP Address
```javascript
// Example invalid IP string
let invalidIp = "999.999.999.999";
checkIPAddress(invalidIp);
```
This will output: `String is Invalid`.
