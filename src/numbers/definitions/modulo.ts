import { Booleans } from "../../boolean";
import { Core } from "../../core/functions";
import { TupleCore } from "../../tuples/core";
import { CompareDefinition } from "./compare";
import { MathDefinition } from "./math";
import { MultiplyDefinition } from "./multiply";
import { SubtractDefinition } from "./subtract";

export declare namespace ModulusDefinition {
  type IsEven<T extends MathDefinition.INTERNAL_NUMBER> = [
    TupleCore.Last<T>,
  ] extends [never]
    ? true
    : TupleCore.Last<T> extends 0 | 2 | 4 | 6 | 8
    ? true
    : false;

  interface IsEvenFn extends Core.Fn {
    return: IsEven<this["arg0"]>;
  }

  type $IsEven<
    T extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > = Core.PartialApply<IsEvenFn, [T]>;

  type IsOdd<T extends MathDefinition.INTERNAL_NUMBER> = Booleans.NOT<
    IsEven<T>
  >;
  type $IsOdd<
    T extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > = Core.PartialApply<Core.ComposeLeft<[$IsEven, Booleans.$NOT]>, [T]>;

  // prettier-ignore
  type CountPossibleSubtractions<A extends MathDefinition.INTERNAL_NUMBER, B extends MathDefinition.INTERNAL_NUMBER> = 
        Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [1]>>]> extends true ? 0 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [2]>>]> extends true ? 1 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [3]>>]> extends true ? 2 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [4]>>]> extends true ? 3 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [5]>>]> extends true ? 4 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [6]>>]> extends true ? 5 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [7]>>]> extends true ? 6 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [8]>>]> extends true ? 7 
    :   Core.Apply<CompareDefinition.$IsLessThan, [A, Core.Eval<MultiplyDefinition.$Multiplier<B, [9]>>]> extends true ? 8 
    :   9;

  type Mod<
    A extends MathDefinition.INTERNAL_NUMBER,
    B extends MathDefinition.INTERNAL_NUMBER,
    Agg extends MathDefinition.INTERNAL_NUMBER = [],
    CurrentNum extends MathDefinition.INTERNAL_NUMBER = [],
  > = A extends [
    infer Head extends MathDefinition.INTERNAL_DIGIT,
    ...infer Tail extends MathDefinition.INTERNAL_NUMBER,
  ]
    ? never extends never
      ? CountPossibleSubtractions<
          CurrentNum,
          B
        > extends infer Poss extends MathDefinition.INTERNAL_DIGIT
        ? Mod<
            Tail,
            B,
            [...Agg, Poss],
            [
              ...Core.Eval<
                SubtractDefinition.$Subtractor<
                  CurrentNum,
                  Core.Eval<MultiplyDefinition.$Multiplier<B, [Poss]>>
                >
              >,
              Head,
            ]
          >
        : never
      : never
    : CountPossibleSubtractions<
        CurrentNum,
        B
      > extends infer Pass extends MathDefinition.INTERNAL_DIGIT
    ? Pass extends 0
      ? CurrentNum
      : Core.Eval<
          SubtractDefinition.$Subtractor<
            CurrentNum,
            Core.Eval<
              MultiplyDefinition.$Multiplier<
                B,
                [CountPossibleSubtractions<CurrentNum, B>]
              >
            >
          >
        >
    : never;

  interface ModFn extends Core.Fn {
    return: Mod<this["arg0"], this["arg1"]>;
  }

  interface $Mod<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<ModFn, [A, B]> {}
}
