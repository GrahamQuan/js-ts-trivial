function throttle(fn, delay = 300) {
  let timer = null;

  return (...args) => {
    if (timer) return;

    setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}
