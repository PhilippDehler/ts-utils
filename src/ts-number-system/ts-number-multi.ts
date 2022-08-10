import { Map, Pair } from "../ts-array-utils";
import { Digit, ExoticNumber, Number, Zero } from "./constants";
import { MultiplicationTable } from "./tables";
import { $ToZero } from "./ts-number-sub";
import { Sum } from "./ts-number-utils";

type ResolveMultiplyRemainder<T extends Pair<Digit, Digit>> = T[1] extends Zero
  ? [T[0]]
  : [T[1], T[0]];

type ZeroArr<T extends unknown[]> = Map<T, $ToZero>;

export type Multiply<
  A extends Number,
  B extends Number,
  TAgg extends Number[] = [],
  Counter extends unknown[] = [],
> = B extends [...infer Init, infer Last]
  ? Init extends Number
    ? Last extends Digit
      ? Multiply<
          A,
          Init,
          [...TAgg, [...MultiplySingle<A, Last>, ...ZeroArr<Counter>]],
          [...Counter, unknown]
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
  Counter extends unknown[] = [],
> = D extends Zero
  ? [Zero]
  : T extends [...infer Init, infer Last]
  ? Init extends Number
    ? Last extends Digit
      ? MultiplySingle<
          Init,
          D,
          [[...MultiplyDigits<Last, D>, ...ZeroArr<Counter>], ...TAgg],
          [...Counter, unknown]
        >
      : never
    : never
  : Sum<TAgg>;

type MultiplyDigits<
  A extends Digit,
  B extends Digit,
> = ResolveMultiplyRemainder<MultiplicationTable[A][B]>;
