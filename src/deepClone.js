// function deepClone(obj) {
//   return JSON.parse(JSON.stringify(obj));
// }

function deepClone(origin) {
  // primitive types
  if (typeof origin !== 'object' || origin === null) {
    return origin;
  }

  let result;

  // array
  if (Array.isArray(origin)) {
    result = [];
  } else {
    result = {};
  }

  // obj
  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      result[key] = deepClone(origin[key]);
    }
  }

  return result;
}

function test() {
  const obj1 = {
    a: 1,
    b: {
      c: '2',
      d: [
        3,
        4,
        {
          e: [5, '6'],
        },
      ],
    },
  };
  const obj2 = deepClone(obj1);
  console.log(JSON.stringify(obj2, null, 4));
  console.log(obj1 === obj2);
}

test();
