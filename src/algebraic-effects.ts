// example: (1) react suspense, (2) clear async await

// main() -> fetch() throw error -> [[network request return cache]] -> main() -> fetch() return data
// main thread won't be waiting since fetch throw error so we need cache

// fetch -> has cache? --no--> network request --> error or return cache
// --yes--> return cache

function getTodo() {
  return fetch('https://jsonplaceholder.typicode.com/todos/1');
}

function todo() {
  const todoData = getTodo();
  return todoData;
}

// mian() will run twice
function main() {
  console.log('main runs twice');
  const data = todo();
  console.log(data);
}

// beware of func may have params
function reactSuspense(func: (value?: any) => void) {
  const oldFetch = global.fetch;

  type Cache = {
    status: 'pending' | 'fulfilled' | 'rejected';
    value: any;
  };
  // beware of cache may be multi threads
  const cache: Cache = { status: 'pending', value: null };

  // change environment
  global.fetch = function (...args) {
    if (cache.status === 'fulfilled') {
      return cache.value;
    }

    if (cache.status === 'rejected') {
      throw cache.value;
    }

    // (1) network request
    const errPromise = oldFetch(...args)
      .then((res) => res.json())
      .then((res) => {
        cache.status = 'fulfilled';
        cache.value = res;
      })
      .catch((err) => {
        cache.status = 'rejected';
        cache.value = err;
      });

    // (2) throw error
    throw errPromise;
  };

  try {
    // entry
    func();
  } catch (err) {
    // beware of it is promise or not
    if (err instanceof Promise) {
      err
        .then(func)
        .catch(func)
        .finally(() => {
          // reset fetch
          global.fetch = oldFetch;
        });
    }
  }
}

reactSuspense(main);

// print
// main runs twice
// cache.status = 'fulfilled'
// err then
// main runs twice
// main console.log
