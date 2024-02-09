// flat array
const myArray = [1, 2, [3, 4, [4, 5]]];

// (1)
// Array.flt()
// console.log(myArray.flat(Infinity));

// (2)
// custom
function flatten(arr: any[], result: any[] = []): any[] {
  for (const item of arr) {
    if (Array.isArray(item)) {
      flatten(item, result);
    } else {
      result.push(item);
    }
  }
  return result;
}

console.log(flatten(myArray));
