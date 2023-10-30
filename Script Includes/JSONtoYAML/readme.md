Hi Everyone,

This code is to convert JSON object into Yaml format.

To use this please pass the JSON object as below to this function as shown below

var conYaml = global.SCRIPTINCLUDENAME ('JSON OBJECT');

conYaml will hold the converted Yaml.

**Inputs**:
{ hello: 'world', hello2: [ 'hello', 'world' ] }

**Outputs**:
---
hello: world
hello2:
- hello
- world
