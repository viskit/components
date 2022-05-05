export const wait = (fn) => {
    let resolve;
    const promise = new Promise((r) => (resolve = r));
    const step = () => {
        if (fn()) {
            resolve(undefined);
        }
        else {
            requestAnimationFrame(step);
        }
    };
    step();
    return promise;
};
