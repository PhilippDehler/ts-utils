import { Digit, GT, LT, Number, SAME } from "./constants";
import { CompareTable } from "./tables";

export type Compare<A extends Number, B extends Number> = keyof B extends keyof A
  ? keyof A extends keyof B
    ? CompareSameSize<A, B>
    : GT
  : LT;

type CompareSameSize<A extends Number, B extends Number> = A extends [
  infer HeadA extends Digit,
  ...infer TailA extends Number,
]
  ? B extends [infer HeadB extends Digit, ...infer TailB extends Number]
    ? CompareTable[HeadA][HeadB] extends SAME
      ? CompareSameSize<TailA, TailB>
      : CompareTable[HeadA][HeadB]
    : never
  : SAME;