/**
 * Wrap any given function `func` and return a version of that function
 * that will queue up additional calls of the limited function to make
 * sure only `maxConcurrency` instances of `func` are running at the same time.
 *
 * Example usage:
 *
 * ```ts
 * async function main() {
 *   async function loadData(i: number) {
 *     await sleep(1000);
 *     return i;
 *   }
 *
 *   const limited = limitConcurrency(1, loadData);
 *
 *
 *   // Even if limited is called 4 times in parallel,
 *   // loadData is only called in serial because maxConcurrency
 *  // is set to 1
 *   const results = await Promise.all([
 *     limited(1),
 *     limited(2),
 *     limited(3),
 *     limited(4),
 *   ]);
 *
 *   // Should log [1, 2, 3, 4] after 4 seconds
 *   console.log(results);
 * }
 * ```
 *
 * @param maxConcurrency
 * @param func
 * @returns
 */
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
