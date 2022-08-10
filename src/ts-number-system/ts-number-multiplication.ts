import { Concat, Pair } from "../ts-array-utils";
import { Digit, ExoticNumber, Number, Zero } from "./constants";
import { MultiplicationTable } from "./tables";
import { Sum } from "./ts-number-utils";

type ResolveMultiplyRemainder<T extends Pair<Digit, Digit>> = T[1] extends Zero
  ? [T[0]]
  : [T[1], T[0]];

export type Multiply<
  A extends Number,
  B extends Number,
  TAgg extends Number[] = [],
  TrailingZeros extends Zero[] = [],
> = B extends [...infer Init, infer Last]
  ? Init extends Number
    ? Last extends Digit
      ? Multiply<
          A,
          Init,
          [...TAgg, Concat<MultiplySingle<A, Last>, TrailingZeros>],
          [...TrailingZeros, Zero]
        >
      : never
    : never
  : Sum<TAgg>;

export type Multiplier<
  A extends ExoticNumber,
  B extends ExoticNumber,
> = Multiply<A["value"], B["value"]>;

type MultiplySingle<
  T extends Number,
  D extends Digit,
  TAgg extends Number[] = [],
  TrailingZeros extends Zero[] = [],
> = D extends Zero
  ? [Zero]
  : T extends [...infer Init, infer Last]
  ? Init extends Number
    ? Last extends Digit
      ? MultiplySingle<
          Init,
          D,
          [Concat<MultiplyDigits<Last, D>, TrailingZeros>, ...TAgg],
          [...TrailingZeros, Zero]
        >
      : never
    : never
  : Sum<TAgg>;

type MultiplyDigits<
  A extends Digit,
  B extends Digit,
> = ResolveMultiplyRemainder<MultiplicationTable[A][B]>;
