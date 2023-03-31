
export class PromiseCollector {
  private readonly promises: Set<Promise<unknown>> = new Set();

  add(promise: Promise<unknown>) {
    this.promises.add(promise);
    promise.finally(() => this.promises.delete(promise));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrap<TArgs extends any[], TReturn>(
    fn: (...args: TArgs) => Promise<TReturn>
  ): (...args: TArgs) => Promise<TReturn> {
    return (...args: TArgs) => {
      const promise = fn(...args);
      this.add(promise);
      return promise;
    };
  }

  async pending() {
    await Promise.all([...this.promises]);
  }
}