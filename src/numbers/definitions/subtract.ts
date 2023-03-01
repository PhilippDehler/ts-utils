import { Core } from "../../core/functions";
import { Helper } from "../../helper";
import { Tuples } from "../../tuples";
import { MathDefinition } from "./math";

export declare namespace SubtractDefinition {
  type SubtractDigit<
    A extends MathDefinition.INTERNAL_DIGIT,
    B extends MathDefinition.INTERNAL_DIGIT,
    Borrw extends MathDefinition.INTERNAL_DIGIT,
  > = Core.Eval<MathDefinition.$SubtractingTable<A, B>> extends {
    number: infer N0 extends MathDefinition.INTERNAL_DIGIT;
    transfer: infer C0 extends MathDefinition.INTERNAL_DIGIT;
  }
    ? Core.Eval<MathDefinition.$SubtractingTable<N0, Borrw>> extends {
        number: infer N1 extends MathDefinition.INTERNAL_DIGIT;
        transfer: infer C1 extends MathDefinition.INTERNAL_DIGIT;
      }
      ? {
          number: N1;
          transfer: Core.Eval<MathDefinition.$AddingTable<C1, C0>>["number"];
        }
      : never
    : never;

  interface $ResolveBorrow extends Core.Fn {
    return: this["arg0"] extends {
      number: infer N extends MathDefinition.INTERNAL_NUMBER;
    }
      ? MathDefinition.NormalizeInternalNumber<N>
      : never;
  }

  interface SubtractDigitFn extends Core.Fn {
    return: this["arg0"] extends {
      number: infer N extends MathDefinition.INTERNAL_NUMBER;
      transfer: infer Borrow extends MathDefinition.INTERNAL_DIGIT;
    }
      ? this["arg1"] extends [
          infer A extends MathDefinition.INTERNAL_DIGIT,
          infer B extends MathDefinition.INTERNAL_DIGIT,
        ]
        ? {
            number: [SubtractDigit<A, B, Borrow>["number"], ...N];
            transfer: SubtractDigit<A, B, Borrow>["transfer"];
          }
        : never
      : never;
  }

  export interface $SubtractDigit<
    T extends
      | {
          number: MathDefinition.INTERNAL_NUMBER;
          transfer: MathDefinition.INTERNAL_DIGIT;
        }
      | Core.unset = Core.unset,
  > extends Core.PartialApply<SubtractDigitFn, [T]> {}

  export interface $Subtractor<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Tuples.$ZipReduceRight<
            $SubtractDigit,
            { number: []; transfer: 0 },
            0,
            0
          >,
          $ResolveBorrow,
        ]
      >,
      [A, B]
    > {}
}

type res0 = Core.Eval<SubtractDefinition.$Subtractor<[1, 1], [1]>>;
//   ^?
type SubTest0 = Helper.Test<res0, [1, 0]>;
//   ^?

type res1 = Core.Eval<SubtractDefinition.$Subtractor<[1, 2, 3], [1, 2, 4]>>;
//   ^?
type SubTest1 = Helper.Test<res1, [9, 9, 9]>;
type res2 = Core.Eval<SubtractDefinition.$Subtractor<[1, 2], [1]>>;
//   ^?
type SubTest2 = Helper.Test<res2, [1, 1]>;
type res3 = SubtractDefinition.SubtractDigit<2, 2, 0>;
//   ^?
type SubTest3 = Helper.Test<res3, { number: 0; transfer: 0 }>;
type res4 = SubtractDefinition.SubtractDigit<1, 2, 1>;
//   ^?
type SubTest4 = Helper.Test<res4, { number: 8; transfer: 1 }>;

type res5 = Core.Eval<SubtractDefinition.$Subtractor<[3, 0, 0], [2, 0, 0]>>;
//   ^?
type SubTest5 = Helper.Test<res5, [1, 0, 0]>;
