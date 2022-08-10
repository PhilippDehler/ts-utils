import {
  ExoticNumber,
  GT,
  LT,
  Minus,
  minus,
  Multiplication,
  multiplication,
  negative,
  Operations,
  plus,
  Plus,
  positive,
  SAME,
  Zero,
} from "./constants";
import { Adder } from "./ts-number-add";
import { CompareExotic } from "./ts-number-compare";
import { Multiplier } from "./ts-number-multi";
import { ParseNumber, WrapNegative, WrapPositive } from "./ts-number-parser";
import { SerializeNumber } from "./ts-number-serializer";
import { Subtractor, SubtractorNegative } from "./ts-number-sub";

type CalculateAddition<
  A extends ExoticNumber,
  B extends ExoticNumber,
  Operation extends Operations = Plus,
> = {
  [plus]: {
    [positive]: {
      [positive]: WrapPositive<Adder<A, B>>;
      [negative]: CompareExotic<A, B> extends SAME
        ? WrapPositive<[Zero]>
        : CompareExotic<A, B> extends LT
        ? WrapNegative<SubtractorNegative<A, B>>
        : CompareExotic<A, B> extends GT
        ? WrapPositive<Subtractor<A, B>>
        : never;
    };
    [negative]: {
      [positive]: CompareExotic<A, B> extends SAME
        ? WrapPositive<[Zero]>
        : CompareExotic<A, B> extends LT
        ? WrapPositive<Subtractor<B, A>>
        : CompareExotic<A, B> extends GT
        ? WrapNegative<SubtractorNegative<B, A>>
        : never;
      [negative]: WrapNegative<Adder<A, B>>;
    };
  };
  [minus]: {
    [positive]: {
      [positive]: CompareExotic<A, B> extends SAME
        ? WrapPositive<[Zero]>
        : CompareExotic<A, B> extends LT
        ? WrapNegative<SubtractorNegative<A, B>>
        : CompareExotic<A, B> extends GT
        ? WrapPositive<Subtractor<A, B>>
        : never;
      [negative]: WrapPositive<Adder<A, B>>;
    };
    [negative]: {
      [positive]: WrapNegative<Adder<A, B>>;
      [negative]: CompareExotic<A, B> extends SAME
        ? WrapPositive<[Zero]>
        : CompareExotic<A, B> extends LT
        ? WrapPositive<Subtractor<B, A>>
        : CompareExotic<A, B> extends GT
        ? WrapNegative<SubtractorNegative<B, A>>
        : never;
    };
  };
  [multiplication]: {
    [positive]: {
      [positive]: WrapPositive<Multiplier<A, B>>;
      [negative]: WrapNegative<Multiplier<A, B>>;
    };
    [negative]: {
      [positive]: WrapNegative<Multiplier<A, B>>;
      [negative]: WrapPositive<Multiplier<A, B>>;
    };
  };
}[Operation][A["sign"]][B["sign"]];

type N0 = ParseNumber<"1000">;
type N1 = ParseNumber<"999">;
type N2 = ParseNumber<"800">;

type N4 = ParseNumber<"-1000">;
type N5 = ParseNumber<"-999">;

//+A-+B -> noSign(A) === noSign(B)
type T00 = SerializeNumber<CalculateAddition<N0, N0, Minus>>;
const t00: T00 = "0";
//+A--B -> noSign(A) < noSign(B)
type T01 = SerializeNumber<CalculateAddition<N0, N5, Minus>>;
const t01: T01 = "1999";
//+A--B -> noSign(A) > noSign(B)
type T02 = SerializeNumber<CalculateAddition<N0, N5, Minus>>;
const t02: T02 = "1999";
//+A--B
type T03 = SerializeNumber<CalculateAddition<N0, N5, Minus>>;
const t03: T03 = "1999";

//-A-+B
type T04 = SerializeNumber<CalculateAddition<N4, N0, Minus>>;
const t04: T04 = "-2000";
//-A--B -> noSign(A) === noSign(B)
type T05 = SerializeNumber<CalculateAddition<N4, N4, Minus>>;
const t05: T05 = "0";
// -A-+B -> noSign(A) < noSign(B)
type T06 = SerializeNumber<CalculateAddition<N5, N0, Minus>>;
const t06: T06 = "-1999";
// -A-+B -> noSign(A) > noSign(B)
type T07 = SerializeNumber<CalculateAddition<N4, N1, Minus>>;
const t07: T07 = "-1999";

//+A++A
type T0 = SerializeNumber<CalculateAddition<N0, N1>>;
const t0: T0 = "1999";
//+A+-B -> noSign(A) === noSign(B)
type T1 = SerializeNumber<CalculateAddition<N0, N4>>;
const t1: T1 = "0";
//+A+-B -> noSign(A) > noSign(B)
type T2 = SerializeNumber<CalculateAddition<N0, N5>>;
const t2: T2 = "1";
//+A+-B -> noSign(A) < noSign(B)
type T3 = SerializeNumber<CalculateAddition<N1, N4>>;
const t3: T3 = "-1";

//-A++B -> noSign(A) === noSign(B)
type T4 = SerializeNumber<CalculateAddition<N4, N0>>;
const t4: T4 = "0";
//-A++B -> noSign(A) < noSign(B)
type T5 = SerializeNumber<CalculateAddition<N5, N0>>;
const t5: T5 = "1";
// -A++B -> noSign(A) >noSign(B)
type T6 = SerializeNumber<CalculateAddition<N4, N2>>;
const t6: T6 = "-200";

type T7 = SerializeNumber<CalculateAddition<N4, N2, Multiplication>>;
const t7: T7 = "-800000";

type T8 = SerializeNumber<CalculateAddition<N0, N2, Multiplication>>;
const t8: T8 = "800000";

type T9 = SerializeNumber<CalculateAddition<N4, N5, Multiplication>>;
const t9: T9 = "999000";
