/**
 * A simple function that introduces a delay in an async function.
 *
 * Example usage:
 * ```ts
 * async function main() {
 *   console.log("hi!");
 *   await sleep(1000);
 *   console.log("after 1 second");
 * }
```
 * @param ms the delay in milliseconds
 * @returns a promise that resolves after ms milliseconds
 */
export function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(() => r(), ms));
}
