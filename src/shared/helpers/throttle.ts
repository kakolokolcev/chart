export function throttle(func: (...args: any[]) => void, ms: number) {
  let isThrottled: boolean = false;
  let savedArgs: any;
  let self: any;

  function wrapper(...args: any[]) {
    if (isThrottled) {
      // @ts-ignore
      self = this;
      savedArgs = args;

      return;
    }

    // @ts-ignore
    func.apply(this, args);

    isThrottled = true;

    // eslint-disable-next-line func-names
    setTimeout(function () {
      isThrottled = false;

      if (savedArgs) {
        wrapper.apply(self, savedArgs);

        savedArgs = null;
        self = null;
      }
    }, ms);
  }

  return wrapper;
}
