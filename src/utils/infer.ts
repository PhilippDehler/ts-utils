import { Narrow } from "../ts-utils";

export function infer<T>(input: Narrow<T>): Narrow<T> {
  return input;
}
