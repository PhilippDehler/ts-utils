import { Pair } from "../ts-array-utils";
import {
  GT,
  LT,
  one,
  One,
  SAME,
  zero,
  Zero,
} from "../ts-number-system/constants";

export type Int4 = [Bit, Bit, Bit, Bit, Bit];
export type Int8 = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit];
export type Int16 = [
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
  Bit,
];

export type Int4SerializeTable<Int extends Int4> = Int extends [
  infer Sign,
  infer Fst,
  infer Scd,
  infer Thrd,
  infer Frth,
]
  ? `${Sign extends Zero ? "" : "-"}`
  : never;

export type Bit = One | Zero;
export type ByteArray = Bit[];

export type BitAddTable<
  B0 extends Bit,
  B1 extends Bit,
  Remainder extends Bit,
> = {
  [one]: {
    [one]: { [one]: Pair<One, One>; [zero]: Pair<Zero, One> };
    [zero]: { [one]: Pair<Zero, One>; [zero]: Pair<One, Zero> };
  };
  [zero]: {
    [one]: { [one]: Pair<Zero, One>; [zero]: Pair<One, Zero> };
    [zero]: { [one]: Pair<One, Zero>; [zero]: Pair<Zero, Zero> };
  };
}[B0][B1][Remainder];

export type BitMultiplikationTable<B0 extends Bit, B1 extends Bit> = {
  [one]: {
    [one]: One;
    [zero]: Zero;
  };
  [zero]: {
    [one]: Zero;
    [zero]: Zero;
  };
}[B0][B1];

export type BitCompare<B0 extends Bit, B1 extends Bit> = {
  [one]: {
    [one]: SAME;
    [zero]: GT;
  };
  [zero]: {
    [one]: LT;
    [zero]: SAME;
  };
}[B0][B1];
