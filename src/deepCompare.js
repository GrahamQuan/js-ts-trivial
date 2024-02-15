function deepCompare(first, second) {
  // primitive types
  if (typeof first !== 'object' && typeof second !== 'object') {
    return first === second;
  }

  const keys1 = Object.keys(first);
  const keys2 = Object.keys(second);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if they have same keys
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
  }

  // Check value: Recursively compare nested objects
  for (const key of keys1) {
    if (!deepCompare(first[key], second[key])) {
      return false;
    }
  }

  return true;
}

function test() {
  const obj1 = { a: 1, b: { c: 2, d: { e: [1, '2'] } } };
  const obj2 = { a: 1, b: { c: 2, d: { e: [1, 2] } } };

  console.log(deepCompare(obj1, obj2)); // Output: false

  const obj3 = { a: 1, b: { c: 2, d: { e: 4 } } };
  console.log(deepCompare(obj1, obj3)); // Output: false
}

test();
