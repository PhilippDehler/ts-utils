import { Length, Tail } from "./ts-array-utils";

export type Increment<T extends unknown[]> = [...T, unknown];
export type Decrement<T extends unknown[]> = Tail<T>;

export type InitCounter<
  T extends number,
  C extends unknown[] = [],
> = C["length"] extends T ? C : InitCounter<T, Increment<C>>;

export type CounterToNumber<C extends unknown[]> = Length<C>;

export type CounterDifference<
  C0 extends unknown[],
  C1 extends unknown[],
> = C0 extends [...C1, ...infer Rest] ? Rest : [];

export type CountCharacters<
  T extends string,
  TAgg extends unknown[] = [],
> = T extends `${infer Head}${infer Rest}`
  ? CountCharacters<Rest, [...TAgg, unknown]>
  : TAgg;
