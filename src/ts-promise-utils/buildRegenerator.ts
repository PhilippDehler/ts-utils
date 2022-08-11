import { sleep } from "./sleep";

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
