# Promise Collector

Promise Collector is a utility class for managing and tracking a collection of promises. It allows you to easily add promises, wrap functions returning promises, and wait for all pending promises to resolve.

## Installation

First, install the package:

```bash
npm i @raphaabreu/promise-collector
```

Then import the `PromiseCollector` class:

```typescript
import { PromiseCollector } from '@raphaabreu/promise-collector';
```

## Usage

Here's an example of how to use the `PromiseCollector` class:

```typescript
const promiseCollector = new PromiseCollector();

// Add a promise to the collection
const promise = new Promise<void>((resolve) => setTimeout(resolve, 100));
promiseCollector.add(promise);

// Wrap a function returning a promise
const asyncFn = async (value: number) => value \* 2;
const wrappedFn = promiseCollector.wrap(asyncFn);

// Execute the wrapped function
const resultPromise = wrappedFn(5);
const result = await resultPromise; // result should be 10

// Wait for all pending promises to resolve
await promiseCollector.pending();
```

## API

`add(promise: Promise<unknown>): void`
Adds a promise to the promises set. The promise will be removed from the set once it's settled (either resolved or rejected).

`wrap<TArgs extends any[], TReturn>(fn: (...args: TArgs) => Promise<TReturn>): (...args: TArgs) => Promise<TReturn>`
Wraps a function that returns a promise, so when the wrapped function is called, its promise is automatically added to the promises set. The promise will be removed from the set once it's settled (either resolved or rejected).

`pending(): Promise<void>`
Returns a promise that resolves when all promises in the promises set have resolved. If there are no pending promises, it resolves immediately.

## Tests

To run the provided unit tests just execute `npm run tests`.

## License

MIT License

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Support

If you have any issues or questions, please open an issue on the project repository.
