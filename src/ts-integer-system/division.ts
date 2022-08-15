import { GT, LT, One, SAME, Zero } from "../ts-number-system/constants";
import { Adder, BitIncrement } from "./add";
import { Compare, GTEComparision, LTEComparision } from "./compare";
import { Bit, ByteArray } from "./constants";

type StepZero<
  A extends ByteArray,
  B extends ByteArray,
  Compared extends SAME | LT | GT = Compare<A, B>,
> = Compared extends LT ? A : Compared extends SAME ? [One] : A;

type StepOne<
  A extends ByteArray,
  B extends ByteArray,
  TAgg extends ByteArray = [],
> = GTEComparision<TAgg, B> extends true
  ? [TAgg, A]
  : A extends [infer Head, ...infer Tail]
  ? StepOne<
      Tail extends ByteArray ? Tail : [],
      B,
      [...TAgg, ...(Head extends Bit ? [Head] : [])]
    >
  : never;

type StepTwo<
  A extends ByteArray,
  B extends ByteArray,
  Count extends ByteArray = [],
  PreviousCount extends ByteArray = [],
> = LTEComparision<A, B> extends true
  ? StepTwo<A, Adder<B, B>, BitIncrement<Count>, B>
  : //TODO
    [One, Adder<A, PreviousCount>];

type Division<
  A extends ByteArray,
  B extends ByteArray,
  Portion extends ByteArray = [],
  Quotient extends ByteArray = [],
> = GTEComparision<Portion, B> extends true
  ? Adder<Portion, B>
  : Division<A, B, Portion, [...Quotient, Zero]>;
