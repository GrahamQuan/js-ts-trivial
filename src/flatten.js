function flatten(arr) {
  let flattenedArray = [];

  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flattenedArray = flattenedArray.concat(flatten(element));
    } else {
      flattenedArray.push(element);
    }
  });

  return flattenedArray;
}

function test() {
  const nestedArray = [1, [2, [3, 4], 5], 6];
  console.log(flatten(nestedArray));
  console.log(nestedArray.flat(Infinity));
}

test();
