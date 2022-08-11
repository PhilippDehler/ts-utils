import { Last } from "../ts-array-utils";
import { $IsFalse } from "../ts-boolean-utils";
import { Call } from "../ts-lambda";
import {
  Eight,
  ExoticNumber,
  Four,
  InfinityExotic,
  Minus,
  Multiplication,
  NaNExotic,
  OneExotic,
  Six,
  Two,
  Zero,
  ZeroExotic,
} from "./constants";
import { Increment } from "./ts-number-addition";
import { Calculate } from "./ts-number-calculator";
import { EqualsExotic, GTExotic, LTExotic } from "./ts-number-compare";
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

export type IsEven<A extends ExoticNumber> = Last<A["value"]> extends
  | Zero
  | Two
  | Four
  | Six
  | Eight
  ? true
  : false;

export type IsOdd<A extends ExoticNumber> = Call<$IsFalse, IsEven<A>>;
