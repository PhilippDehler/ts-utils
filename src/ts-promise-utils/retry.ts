import { sleep } from "./sleep";

export async function retry<TReturn>(
  asyncFn: () => Promise<TReturn>,
  config: { retries?: number; timeout?: number } = { retries: 0, timeout: 0 },
): Promise<TReturn> {
  const { retries = 0, timeout = 0 } = config;
  try {
    const result = await asyncFn();
    return result;
  } catch (err) {
    if (retries === 0) throw err;
    await sleep(timeout);
    return retry(asyncFn);
  }
}

export function limitConcurrency<TArgs extends any[], TReturnType>(
  maxConcurrency: number,
  func: (...args: TArgs) => Promise<TReturnType>,
): (...args: TArgs) => Promise<TReturnType> {
  let queue: (() => Promise<void>)[] = [];
  let runningRequests = 0;
  const next = () => queue.shift()?.() ?? null;
  return (...args: TArgs) =>
    new Promise<TReturnType>((resolve, reject) => {
      const queueItem = () => {
        runningRequests++;
        return func(...args)
          .then(resolve, reject)
          .finally(() => {
            runningRequests--;
            next();
          });
      };
      if (runningRequests === maxConcurrency) return queue.push(queueItem);
      queueItem();
    });
}

export function buildRegenerator(
  regenerationRule: <TResponse>(response: TResponse) => number,
) {
  let timeoutPromise = Promise.resolve();
  return <T>(request: () => Promise<T>) =>
    new Promise<T>(
      (resolve) =>
        (timeoutPromise = timeoutPromise.then(request).then((result) => {
          resolve(result);
          return sleep(regenerationRule<T>(result));
        })),
    );
}
