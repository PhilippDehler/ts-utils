import { Core } from "../../core/functions";
import { Helper } from "../../helper";
import { CompareDefinition } from "./compare";
import { MathDefinition } from "./math";
import { MultiplyDefinition } from "./multiply";
import { SubtractDefinition } from "./subtract";

export declare namespace DivisionDefinition {
  // prettier-ignore
  type __FloorDivision<
  A extends MathDefinition.INTERNAL_NUMBER,
  B extends MathDefinition.INTERNAL_NUMBER,
  Agg extends MathDefinition.INTERNAL_NUMBER = [],
  CurrentNum extends MathDefinition.INTERNAL_NUMBER = [],
> = A extends [infer Head extends MathDefinition.INTERNAL_DIGIT, ...infer Tail extends MathDefinition.INTERNAL_NUMBER]
      ? __CountPossibleSubtractions<CurrentNum, B> extends infer Poss extends MathDefinition.INTERNAL_DIGIT
        ? __FloorDivision<Tail, B, [...Agg, Poss], [...Core.Eval<SubtractDefinition.$Subtractor<CurrentNum, Core.Eval<MultiplyDefinition.$Multiplier<B, [Poss]>>>>, Head]>
        : never
      : [...Agg, __CountPossibleSubtractions<CurrentNum, B>];

  // prettier-ignore
  type __CountPossibleSubtractions<A extends MathDefinition.INTERNAL_NUMBER, B extends MathDefinition.INTERNAL_NUMBER> = 
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

  // prettier-ignore
  type NormalizedDivision<
    A extends MathDefinition.INTERNAL_NUMBER,
    B extends MathDefinition.INTERNAL_NUMBER,
   > = 
    [MathDefinition.NormalizeInternalNumber<A>, MathDefinition.NormalizeInternalNumber<B>] extends 
    [infer CollapsedA extends MathDefinition.INTERNAL_NUMBER, infer CollapsedB extends MathDefinition.INTERNAL_NUMBER,]
      ? CollapsedA extends [MathDefinition.NaN] ? [MathDefinition.NaN]
      : CollapsedB extends [MathDefinition.NaN] ? [MathDefinition.NaN]

      : CollapsedB extends [0] ? 
        CollapsedA extends [0] ? [MathDefinition.NaN] : [MathDefinition.Infinity]
      : CollapsedA extends [0] ? [0]

      : CollapsedA extends [MathDefinition.Infinity] ? 
        CollapsedB extends [MathDefinition.Infinity] ? [MathDefinition.NaN] : [0]
      : CollapsedA extends [MathDefinition.Infinity] ? [MathDefinition.Infinity]
      
      : MathDefinition.NormalizeInternalNumber<__FloorDivision<A, B>>
    : never;

  interface FloorDivisionFn extends Core.Fn {
    return: NormalizedDivision<this["arg0"], this["arg1"]>;
  }

  interface $FloorDivision<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<FloorDivisionFn, [A, B]> {}
}

type res0 = DivisionDefinition.NormalizedDivision<[1, 2, 4], [1, 2, 3]>;
//   ^?
type Test0 = Helper.Test<res0, [1]>;

type res1 = DivisionDefinition.NormalizedDivision<[1, 2, 4, 0, 0], [1, 2, 4]>;
//   ^?
type Test1 = Helper.Test<res1, [1, 0, 0]>;

type res2 = DivisionDefinition.NormalizedDivision<[1, 0, 0, 0], [1, 0]>;
//   ^?
type Test2 = Helper.Test<res2, [1, 0, 0]>;

type res3 = DivisionDefinition.NormalizedDivision<[1, 0, 0], [1, 0, 0]>;
//   ^?
type Test3 = Helper.Test<res3, [1]>;

type res4 = DivisionDefinition.NormalizedDivision<[1, 0, 0], [1, 0, 1]>;
//   ^?
type Test4 = Helper.Test<res4, [0]>;
//   ^?

type res5 = DivisionDefinition.NormalizedDivision<[1, 0, 0], [1, 0, 2]>;
//   ^?
type Test5 = Helper.Test<res5, [0]>;
//   ^?

type res6 = DivisionDefinition.NormalizedDivision<[1, 0, 0], [1, 0, 3]>;
//   ^?
type Test6 = Helper.Test<res6, [0]>;
//   ^?

type res7 = DivisionDefinition.NormalizedDivision<[1, 0, 5], [1, 0, 4]>;
//   ^?
type Test7 = Helper.Test<res7, [1]>;
//   ^?
