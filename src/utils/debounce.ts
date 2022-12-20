export function debounce(func: Function, timeoutMS: number): Function {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeoutMS);

    return () => clearTimeout(timer);
  };
}
