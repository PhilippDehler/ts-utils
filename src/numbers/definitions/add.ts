import { Core } from "../../core/functions";
import { Helper } from "../../helper";
import { Tuples } from "../../tuples";
import { TupleCore } from "../../tuples/core";
import { MathDefinition } from "./math";

export declare namespace AddDefinition {
  type AddDigit<
    A extends MathDefinition.INTERNAL_DIGIT,
    B extends MathDefinition.INTERNAL_DIGIT,
    Carry extends MathDefinition.INTERNAL_DIGIT,
  > = Core.Eval<MathDefinition.$AddingTable<A, B>> extends {
    number: infer N extends MathDefinition.INTERNAL_DIGIT;
    transfer: infer C extends MathDefinition.INTERNAL_DIGIT;
  }
    ? {
        number: Core.Eval<MathDefinition.$AddingTable<Carry, N>>["number"];
        transfer: Core.Eval<
          MathDefinition.$AddingTable<
            C,
            Core.Eval<MathDefinition.$AddingTable<Carry, N>>["transfer"]
          >
        >["number"];
      }
    : never;

  interface ResolveCarry extends Core.Fn {
    return: this["arg0"] extends {
      number: infer N extends MathDefinition.INTERNAL_NUMBER;
      transfer: infer C extends MathDefinition.INTERNAL_DIGIT;
    }
      ? MathDefinition.NormalizeInternalNumber<C extends 0 ? N : [C, ...N]>
      : never;
  }

  export interface AddDigitFn extends Core.Fn {
    return: this["arg0"] extends {
      number: infer N extends MathDefinition.INTERNAL_NUMBER;
      transfer: infer Carry extends MathDefinition.INTERNAL_DIGIT;
    }
      ? this["arg1"] extends [
          infer A extends MathDefinition.INTERNAL_DIGIT,
          infer B extends MathDefinition.INTERNAL_DIGIT,
        ]
        ? {
            number: [AddDigit<A, B, Carry>["number"], ...N];
            transfer: AddDigit<A, B, Carry>["transfer"];
          }
        : never
      : never;
  }

  export interface $AddDigit<
    T extends
      | {
          number: MathDefinition.INTERNAL_NUMBER;
          transfer: MathDefinition.INTERNAL_DIGIT;
        }
      | Core.unset = Core.unset,
  > extends Core.PartialApply<AddDigitFn, [T]> {}

  interface $Sum<
    A extends MathDefinition.INTERNAL_NUMBER[] | Core.unset = Core.unset,
  > extends Core.PartialApply<Tuples.$Reduce<$Adder, []>, [A]> {}

  export interface $Adder<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<
        [
          Tuples.$ZipReduceRight<$AddDigit, { number: []; transfer: 0 }, 0, 0>,
          ResolveCarry,
        ]
      >,
      [A, B]
    > {}
}

type TestAddDigit0 = AddDefinition.AddDigit<0, 0, 0>;
//   ^?
type TestAddDigit1 = AddDefinition.AddDigit<0, 0, 1>;
//   ^?
type TestAddDigit2 = AddDefinition.AddDigit<0, 1, 0>;
//   ^?
type TestAddDigit3 = AddDefinition.AddDigit<0, 1, 1>;
//   ^?
type TestAddDigit4 = AddDefinition.AddDigit<9, 9, 9>;
//   ^?
type TestAddDigit5 = AddDefinition.AddDigit<4, 9, 1>;
//   ^?
type TestAddDigit6 = AddDefinition.AddDigit<1, 9, 0>;
//   ^?
type TestAddDigit7 = AddDefinition.AddDigit<9, 1, 1>;
//   ^?
type ResAdd = Core.Eval<AddDefinition.$Adder<[1], [1]>>;
//   ^?
type TestAdd = Helper.Test<ResAdd, [2]>;
//    ^?
type TestAdd1 = Helper.Test<Core.Eval<AddDefinition.$Adder<[1], [1]>>, [2]>;
//    ^?
type TestAdd2 = Helper.Test<Core.Eval<AddDefinition.$Adder<[9], [1]>>, [1, 0]>;
//    ^?
type TestAdd3 = Helper.Test<
  Core.Eval<AddDefinition.$Adder<[1, 8], [1, 9]>>,
  [3, 7]
>;
//    ^?
type TestAdd4 = Helper.Test<
  Core.Eval<AddDefinition.$Adder<[1, 0, 5], [5]>>,
  [1, 1, 0]
>;
//    ^?
type TestAdd5 = Helper.Test<
  //    ^?
  Core.Apply<AddDefinition.$Adder, [[1, 2, 0], [8, 8, 0]]>,
  [1, 0, 0, 0]
>;
type TestAdd6 = Helper.Test<
  Core.Eval<AddDefinition.$Adder<[], [8, 8, 0]>>,
  [8, 8, 0]
>;
//    ^?

type X = TupleCore.Reduce<[[1, 2, 3], [1, 2, 3]], AddDefinition.$Adder, []>;
type Y = Core.Eval<AddDefinition.$Sum<[[1, 2, 3], [1, 2, 3]]>>;
type Z = Core.Apply<AddDefinition.$Sum, [[[1, 2, 3], [1, 2, 3]]]>;

type TestSum = Helper.Test<
  //    ^?
  Core.Apply<AddDefinition.$Sum, [[[1, 2, 3], [1, 2, 3]]]>,
  [2, 4, 6]
>;
