import { Core } from "./core/functions";

export declare namespace Helper {
  export type IsEqual<A, B> = [A] extends [B]
    ? [B] extends [A]
      ? true
      : false
    : false;

  export type Test<A, B extends A> = IsEqual<A, B>;

  interface Extends<Constraint> extends Core.Fn {
    return: this["arg0"] extends Constraint ? true : false;
  }

  export type Head<T extends unknown[]> = T extends [infer Head, ...unknown[]]
    ? Head
    : never;
}
