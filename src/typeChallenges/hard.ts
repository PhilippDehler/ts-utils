import { throwNotImplemented } from "../ts-utils";

const add = (a: number, b: number) => a + b;
const three = add(1, 2);

type Curry<T extends (...args: any) => any> = Parameters<T> extends [
  infer Head,
  ...infer Tail,
]
  ? (args: Head) => Curry<(...args: Tail) => ReturnType<T>>
  : ReturnType<T>;
function Currying<T extends (...args: any) => any>(fn: T): Curry<T> {
  return throwNotImplemented();
}
const curriedAdd = Currying(add);
const five = curriedAdd(2)(3);

type StringToNumber<N> = N extends `${infer T}` ? T : never;

type C = StringToNumber<"100">;
