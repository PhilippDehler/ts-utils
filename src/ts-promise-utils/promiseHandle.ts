/**
 * Creates a promise that can be resolved or rejected from the outside.
 *
 * Example usage:
 *
 * ```ts
 * async function main() {
 *   const handle = promiseHandle<number>();
 *
 *   const { resolve, reject, promise } = handle;
 *
 *   setTimeout(() => {
 *     resolve(10);
 *   }, 10000);
 *
 *   const result = await promise;
 *
 *   // Should log 10 after 10 seconds
 *   console.log(result);
 * }
 * ```
 * @returns
 */
export function promiseHandle<TValue>(): {
  promise: Promise<TValue>;
  resolve: (value: TValue | PromiseLike<TValue>) => void;
  reject: (reason?: any) => void;
} {
  let resolve: (value: TValue | PromiseLike<TValue>) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<TValue>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve: resolve!, reject: reject! };
}
