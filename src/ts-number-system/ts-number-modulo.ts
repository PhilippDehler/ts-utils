import {
  ExoticNumber,
  InfinityExotic,
  Minus,
  Mod,
  Multiplication,
  NaNExotic,
  OneExotic,
  ZeroExotic,
} from "./constants";
import { Increment } from "./ts-number-addition";
import { Calculate } from "./ts-number-calculator";
import { EqualsExotic, GTExotic, LTExotic } from "./ts-number-compare";
import { ParseNumber } from "./ts-number-parser";
import { Decrement } from "./ts-number-subtraction";

export type Modulo<
  A extends ExoticNumber,
  B extends ExoticNumber,
  TAgg extends ExoticNumber = ZeroExotic,
> = B extends ZeroExotic
  ? NaNExotic
  : B extends OneExotic
  ? ZeroExotic
  : B extends OneExotic
  ? A
  : B extends InfinityExotic
  ? NaNExotic
  : LTExotic<Calculate<TAgg, B, Multiplication>, A> extends true
  ? Modulo<A, B, Increment<TAgg>>
  : never | EqualsExotic<Calculate<TAgg, B, Multiplication>, A> extends true
  ? TAgg
  : never | GTExotic<Calculate<TAgg, B, Multiplication>, A> extends true
  ? Calculate<A, Calculate<B, Decrement<TAgg>, Multiplication>, Minus>
  : never;

type X = Calculate<ParseNumber<"129">, ParseNumber<"3">, Mod>;
