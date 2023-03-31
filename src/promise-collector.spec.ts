import { PromiseCollector } from './promise-collector';

describe('PromiseCollector', () => {
  let promiseCollector: PromiseCollector;

  beforeEach(() => {
    promiseCollector = new PromiseCollector();
  });

  describe('add', () => {
    it('should add a promise to the promises set', async () => {
      // Arrange
      const promise = new Promise<void>((resolve) => setTimeout(resolve, 100));

      // Act
      promiseCollector.add(promise);
      expect(promiseCollector['promises'].size).toBe(1);

      // Assert
      await promise;
      expect(promiseCollector['promises'].size).toBe(0);
    });
  });

  describe('wrap', () => {
    it('should wrap a function and add its promise to the promises set', async () => {
      // Arrange
      const fn = async (val: number) => val * 2;
      const wrappedFn = promiseCollector.wrap(fn);

      // Act
      const resultPromise = wrappedFn(5);
      expect(promiseCollector['promises'].size).toBe(1);

      // Assert
      const result = await resultPromise;
      expect(promiseCollector['promises'].size).toBe(0);
      expect(result).toBe(10);
    });
  });

  describe('pending', () => {
    it('should wait for all promises in the promises set to resolve', async () => {
      // Arrange
      const promise1 = new Promise<void>((resolve) => setTimeout(resolve, 100));
      const promise2 = new Promise<void>((resolve) => setTimeout(resolve, 200));
      promiseCollector.add(promise1);
      promiseCollector.add(promise2);

      // Act
      const pendingPromise = promiseCollector.pending();
      expect(promiseCollector['promises'].size).toBe(2);

      // Assert
      await pendingPromise;
      expect(promiseCollector['promises'].size).toBe(0);
    });
  });
});
