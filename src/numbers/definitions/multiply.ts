import { Core } from "../../core/functions";
import { Helper } from "../../helper";
import { Tuples } from "../../tuples";
import { AddDefinition } from "./add";
import { MathDefinition } from "./math";

export declare namespace MultiplyDefinition {
  type MultiplyDigitBase<
    A extends MathDefinition.INTERNAL_DIGIT,
    B extends MathDefinition.INTERNAL_DIGIT,
    Carry extends MathDefinition.INTERNAL_DIGIT,
  > = Core.Eval<MathDefinition.$MultiplyingTable<A, B>> extends {
    number: infer NextNumberWithOutPreviousOverflow extends MathDefinition.INTERNAL_DIGIT;
    transfer: infer NextCarry extends MathDefinition.INTERNAL_DIGIT;
  }
    ? AddDefinition.AddDigit<
        Carry,
        NextNumberWithOutPreviousOverflow,
        0
      > extends {
        number: infer N extends MathDefinition.INTERNAL_DIGIT;
        transfer: infer C extends MathDefinition.INTERNAL_DIGIT;
      }
      ? {
          number: N;
          transfer: AddDefinition.AddDigit<C, NextCarry, 0>["number"];
        }
      : never
    : never;

  interface MultiplyDigitReducer extends Core.Fn {
    return: this["arg0"] extends {
      number: infer Number extends MathDefinition.INTERNAL_NUMBER;
      transfer: infer Carry extends MathDefinition.INTERNAL_DIGIT;
    }
      ? this["arg1"] extends [
          infer A extends MathDefinition.INTERNAL_DIGIT,
          infer B extends MathDefinition.INTERNAL_DIGIT,
        ]
        ? {
            number: [MultiplyDigitBase<A, B, Carry>["number"], ...Number];
            transfer: MultiplyDigitBase<A, B, Carry>["transfer"];
          }
        : never
      : never;
  }

  type MultiplyNumberWithDigit<
    A extends MathDefinition.INTERNAL_NUMBER,
    B extends MathDefinition.INTERNAL_DIGIT,
    Carry extends MathDefinition.INTERNAL_DIGIT,
  > = Core.Apply<
    Core.ComposeLeft<
      [
        Tuples.$ZipReduceRight<
          MultiplyDigitReducer,
          { number: []; transfer: Carry },
          0,
          B
        >,
        AddDefinition.ResolveCarry,
      ]
    >,
    [A, []]
  >;

  type SeperatedMultiplikation<
    A extends MathDefinition.INTERNAL_NUMBER,
    B extends MathDefinition.INTERNAL_NUMBER,
    Nums extends MathDefinition.INTERNAL_NUMBER[] = [],
    Pads extends 0[] = [],
  > = B extends [
    ...infer Init extends MathDefinition.INTERNAL_NUMBER,
    infer Last extends MathDefinition.INTERNAL_DIGIT,
  ]
    ? SeperatedMultiplikation<
        A,
        Init,
        [
          [...MultiplyDefinition.MultiplyNumberWithDigit<A, Last, 0>, ...Pads],
          ...Nums,
        ],
        [...Pads, 0]
      >
    : Nums;

  interface $SeperateMultiplikation extends Core.Fn {
    return: SeperatedMultiplikation<this["arg0"], this["arg1"]>;
  }

  type I = SeperatedMultiplikation<[MathDefinition.Infinity], [1, 2, 3]>;
  type II = Core.Eval<$Multiplier<[MathDefinition.Infinity], [1, 2, 3]>>;

  export interface $Multiplier<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[$SeperateMultiplikation, AddDefinition.$Sum]>,
      [A, B]
    > {}
}

type res0 = Core.Apply<
  MultiplyDefinition.$SeperateMultiplikation,
  [[1, 0, 0], [1, 0, 0]]
>;
//   ^?

type res = Core.Apply<MultiplyDefinition.$Multiplier, [[1, 0, 0], [1, 0, 0]]>;
//   ^?
type MultplierTest = Helper.Test<
  //      ^?
  res,
  [1, 0, 0, 0, 0]
>;
type MultplierTest1 = Helper.Test<
  //      ^?
  Core.Apply<MultiplyDefinition.$Multiplier, [[1, 2, 0], [1, 2, 0]]>,
  [1, 4, 4, 0, 0]
>;
type MultplierTest2 = Helper.Test<
  //      ^?
  Core.Apply<MultiplyDefinition.$Multiplier, [[1, 2, 0], [1, 2, 0, 0]]>,
  [1, 4, 4, 0, 0, 0]
>;
type MultplierTest3 = Helper.Test<
  //      ^?
  Core.Apply<MultiplyDefinition.$Multiplier, [[1, 2, 0, 0], []]>,
  []
>;
type MultplierTest4 = Helper.Test<
  //      ^?
  Core.Apply<MultiplyDefinition.$Multiplier, [[1, 2, 0, 0], [1, 2]]>,
  [1, 4, 4, 0, 0]
>;
