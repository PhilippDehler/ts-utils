import {
  Division,
  ExoticNumber,
  InfinityExotic,
  Multiplication,
  OneExotic,
  ZeroExotic,
} from "./constants";
import { Increment } from "./ts-number-addition";
import { Calculate } from "./ts-number-calculator";
import { EqualsExotic, GTExotic, LTExotic } from "./ts-number-compare";
import { ParseNumber } from "./ts-number-parser";
import { Decrement } from "./ts-number-subtraction";

export type Divider<
  A extends ExoticNumber,
  B extends ExoticNumber,
  TAgg extends ExoticNumber = ZeroExotic,
> = B extends ZeroExotic
  ? InfinityExotic
  : B extends OneExotic
  ? A
  : B extends InfinityExotic
  ? ZeroExotic
  : LTExotic<Calculate<TAgg, B, Multiplication>, A> extends true
  ? Divider<A, B, Increment<TAgg>>
  : never | EqualsExotic<Calculate<TAgg, B, Multiplication>, A> extends true
  ? TAgg
  : never | GTExotic<Calculate<TAgg, B, Multiplication>, A> extends true
  ? Decrement<TAgg>
  : never;

type X = Calculate<ParseNumber<"130">, ParseNumber<"123">, Division>;
