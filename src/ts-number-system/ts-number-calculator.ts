import {
  Division,
  division,
  ExoticNumber,
  GT,
  LT,
  Minus,
  minus,
  mod,
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
import { Adder } from "./ts-number-addition";
import { CompareExotic } from "./ts-number-compare";
import { Divider } from "./ts-number-division";
import { Modulo } from "./ts-number-modulo";
import { Multiplier } from "./ts-number-multiplication";
import {
  Negative,
  ParseNumber,
  Positive,
  WrapNegative,
  WrapPositive,
} from "./ts-number-parser";
import { SerializeNumber } from "./ts-number-serializer";
import { Subtractor, SubtractorNegative } from "./ts-number-subtraction";

export type Calculate<
  A extends ExoticNumber,
  B extends ExoticNumber,
  Operation extends Operations = Plus,
> = {
  [mod]: {
    [positive]: {
      [positive]: Modulo<A, B>;
      [negative]: Modulo<A, B>;
    };
    [negative]: {
      [positive]: Modulo<A, B>;
      [negative]: Modulo<A, B>;
    };
  };
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
  [division]: {
    [positive]: {
      [positive]: Divider<Positive<A>, Positive<B>>;
      [negative]: Negative<Divider<Positive<A>, Positive<B>>>;
    };
    [negative]: {
      [positive]: Negative<Divider<Positive<A>, Positive<B>>>;
      [negative]: Divider<Positive<A>, Positive<B>>;
    };
  };
}[Operation][A["sign"]][B["sign"]];

//+A-+B -> noSign(A) === noSign(B)
type T00 = SerializeNumber<
  Calculate<ParseNumber<"1000">, ParseNumber<"1000">, Minus>
>;
const t00: T00 = "0";
//+A--B -> noSign(A) < noSign(B)
type T01 = SerializeNumber<
  Calculate<ParseNumber<"1000">, ParseNumber<"-999">, Minus>
>;
const t01: T01 = "1999";
//+A--B -> noSign(A) > noSign(B)
type T02 = SerializeNumber<
  Calculate<ParseNumber<"1000">, ParseNumber<"-999">, Minus>
>;
const t02: T02 = "1999";
//+A--B
type T03 = SerializeNumber<
  Calculate<ParseNumber<"1000">, ParseNumber<"-999">, Minus>
>;
const t03: T03 = "1999";

//-A-+B
type T04 = SerializeNumber<
  Calculate<ParseNumber<"-1000">, ParseNumber<"1000">, Minus>
>;
const t04: T04 = "-2000";
//-A--B -> noSign(A) === noSign(B)
type T05 = SerializeNumber<
  Calculate<ParseNumber<"-1000">, ParseNumber<"-1000">, Minus>
>;
const t05: T05 = "0";
// -A-+B -> noSign(A) < noSign(B)
type T06 = SerializeNumber<
  Calculate<ParseNumber<"-999">, ParseNumber<"1000">, Minus>
>;
const t06: T06 = "-1999";
// -A-+B -> noSign(A) > noSign(B)
type T07 = SerializeNumber<
  Calculate<ParseNumber<"-1000">, ParseNumber<"999">, Minus>
>;
const t07: T07 = "-1999";

//+A++A
type T0 = SerializeNumber<Calculate<ParseNumber<"1000">, ParseNumber<"999">>>;
const t0: T0 = "1999";
//+A+-B -> noSign(A) === noSign(B)
type T1 = SerializeNumber<Calculate<ParseNumber<"1000">, ParseNumber<"-1000">>>;
const t1: T1 = "0";
//+A+-B -> noSign(A) > noSign(B)
type T2 = SerializeNumber<Calculate<ParseNumber<"1000">, ParseNumber<"-999">>>;
const t2: T2 = "1";
// //+A+-B -> noSign(A) < noSign(B)
// type T3 = SerializeNumber<Calculate<ParseNumber<"999">, ParseNumber<"-1000">>>;
// const t3: T3 = "-1";

//-A++B -> noSign(A) === noSign(B)
type T4 = SerializeNumber<Calculate<ParseNumber<"-1000">, ParseNumber<"1000">>>;
const t4: T4 = "0";
//-A++B -> noSign(A) < noSign(B)
type T5 = SerializeNumber<Calculate<ParseNumber<"-999">, ParseNumber<"1000">>>;
const t5: T5 = "1";
// -A++B -> noSign(A) >noSign(B)
type T6 = SerializeNumber<Calculate<ParseNumber<"-1000">, ParseNumber<"800">>>;
const t6: T6 = "-200";

type T7 = SerializeNumber<
  Calculate<ParseNumber<"-1000">, ParseNumber<"800">, Multiplication>
>;
const t7: T7 = "-800000";

type T3 = SerializeNumber<Calculate<ParseNumber<"999">, ParseNumber<"-1000">>>;
const t3: T3 = "-1";

type T8 = SerializeNumber<
  Calculate<ParseNumber<"1000">, ParseNumber<"800">, Multiplication>
>;
const t8: T8 = "800000";

type T9 = SerializeNumber<
  Calculate<ParseNumber<"-5891489123">, ParseNumber<"3523">, Multiplication>
>;
const t9: T9 = "-20755716180329";

type T10 = SerializeNumber<
  Calculate<ParseNumber<"-584">, ParseNumber<"2">, Division>
>;
const t10: T10 = "-292";

type T11 = SerializeNumber<
  Calculate<ParseNumber<"-585">, ParseNumber<"2">, Division>
>;
const T11: T11 = "-292";
