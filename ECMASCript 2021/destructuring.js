// Okay, so destructuring is a LOT more than this but here is just an example.

const x = [1, 2, 3, 4, 5];
const [y, z] = x;
// y: 1
// z: 2

const obj = { a: 1, b: 2 };
const { a, b } = obj;
// is equivalent to:
// const a = obj.a;
// const b = obj.b;