// input:
// compact([0, 1, false, 2, "", 3, true, "hello"]); // [1, 2, 3, true, 'hello']
// compact([null, undefined, NaN, " "]); // [' ']
// output:
// compact([{ name: "Alice" }, null, { age: 30 }, undefined]); // [{ name: 'Alice' }, { age: 30 }]

function compact(arr: any[]): any[] {
  const result = [];
  for (const item of arr) {
    if (item) {
      result.push(item);
    }
  }
  return result;
}

function test() {
  console.log(compact([0, 1, false, 2, '', 3, true, 'hello']));
  console.log(compact([null, undefined, NaN, ' ']));
  console.log(compact([{ name: 'Alice' }, null, { age: 30 }, undefined]));
}

test();
