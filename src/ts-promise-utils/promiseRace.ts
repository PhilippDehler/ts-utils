/**
 * Manual implementation of `Promise.race` function, without directly
 * using `Promise.race`.
 * `promiseRace` gets passed a list of promises and returns a
 * new promise that settles with the same value as the fastes
 * promise in the given list.
 *
 * Example usage:
 * ```ts
 * async function main() {
 *   const result = await promiseRace([
 *     sleep(1000).then(() => 2),
 *     sleep(2000).then(() => 3),
 *     sleep(500).then(() => 1),
 *   ]);
 *
 *   // Should log 1
 *   console.log(result);
 * }
 * ```
 * @param promises list of promises
 * @returns the fastest promise in the list
 */
export function promiseRace<TPromises extends Promise<any>[]>(
  promises: TPromises
): Promise<Awaited<TPromises[number]>> {
  return new Promise((resolve, reject) =>
    promises.forEach((promise) => promise.then(resolve, reject))
  );
}
