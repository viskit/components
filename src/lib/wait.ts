export const wait = (fn: () => boolean) => {
  let resolve!: (v: unknown) => void;
  const promise = new Promise((r) => (resolve = r));

  const step = () => {
    if (fn()) {
      resolve(undefined);
    } else {
      requestAnimationFrame(step);
    }
  };

  step();
  return promise;
};
