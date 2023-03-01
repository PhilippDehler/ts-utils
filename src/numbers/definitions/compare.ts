import { Booleans } from "../../boolean";
import { Core } from "../../core/functions";
import { Helper } from "../../helper";
import { Tuples } from "../../tuples";
import { MathDefinition } from "./math";

export declare namespace CompareDefinition {
  export type GT<
    B extends [MathDefinition.INTERNAL_DIGIT, MathDefinition.INTERNAL_DIGIT][],
  > = B extends [
    [
      infer A extends MathDefinition.INTERNAL_DIGIT,
      infer B extends MathDefinition.INTERNAL_DIGIT,
    ],
    ...infer C extends [
      MathDefinition.INTERNAL_DIGIT,
      MathDefinition.INTERNAL_DIGIT,
    ][],
  ]
    ? Core.Eval<
        MathDefinition.$CompareTable<A, B>
      > extends infer Compared extends MathDefinition.COMPARE_RESULT
      ? Compared["eq"] extends true
        ? GT<C>
        : Compared["gt"] extends true
        ? true
        : false
      : never
    : false;

  interface $GT extends Core.Fn {
    return: GT<this["arg0"]>;
  }

  export type LTE<
    B extends [MathDefinition.INTERNAL_DIGIT, MathDefinition.INTERNAL_DIGIT][],
  > = Booleans.NOT<GT<B>>;

  type $LTE = Core.ComposeLeft<[$GT, Booleans.$NOT]>;

  interface $LT extends Core.Fn {
    return: Booleans.AND<Booleans.NOT<Eq<this["arg0"]>>, LTE<this["arg0"]>>;
  }
  type $GTE = Core.ComposeLeft<[$LT, Booleans.$NOT]>;

  type Eq<
    B extends [MathDefinition.INTERNAL_DIGIT, MathDefinition.INTERNAL_DIGIT][],
  > = B extends [
    [
      infer A extends MathDefinition.INTERNAL_DIGIT,
      infer B extends MathDefinition.INTERNAL_DIGIT,
    ],
    ...infer C extends [
      MathDefinition.INTERNAL_DIGIT,
      MathDefinition.INTERNAL_DIGIT,
    ][],
  ]
    ? Core.Eval<
        MathDefinition.$CompareTable<A, B>
      > extends infer Compared extends MathDefinition.COMPARE_RESULT
      ? Compared["eq"] extends true
        ? Eq<C>
        : false
      : never
    : true;

  interface $Eq extends Core.Fn {
    return: Eq<this["arg0"]>;
  }

  interface $IsLessThan<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[Tuples.$ZipRight<0, 0>, $LT]>,
      [A, B]
    > {}

  interface $IsGreaterThan<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[Tuples.$ZipRight<0, 0>, $GT]>,
      [A, B]
    > {}

  interface $IsLessThanOrEqual<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[Tuples.$ZipRight<0, 0>, $LTE]>,
      [A, B]
    > {}

  interface $IsGreaterThanOrEqual<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[Tuples.$ZipRight<0, 0>, $GTE]>,
      [A, B]
    > {}

  interface $IsEqual<
    A extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
    B extends MathDefinition.INTERNAL_NUMBER | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[Tuples.$ZipRight<0, 0>, $Eq]>,
      [A, B]
    > {}
}

type res0 = Core.Apply<CompareDefinition.$IsEqual<[1, 2, 3]>, [[1, 2, 3]]>; // false
//   ^?
type res1 = Core.Apply<CompareDefinition.$IsLessThan, [[1, 2, 3], [1, 2, 3]]>; // false
//   ^?
type res2 = Core.Apply<
  CompareDefinition.$IsGreaterThan,
  [[1, 2, 3], [1, 2, 3]]
>; // false
//   ^?
type res3 = Core.Apply<
  CompareDefinition.$IsLessThanOrEqual,
  [[1, 2, 3], [1, 2, 3]]
>; // true
//   ^?
type res4 = Core.Apply<
  CompareDefinition.$IsGreaterThanOrEqual,
  [[1, 2, 3], [1, 2, 3]]
>; // true
//   ^?

// now we compare 1 with 2
type res5 = Core.Apply<CompareDefinition.$IsEqual, [[9], [1, 0]]>;
//   ^?
type TestRes5 = Helper.Test<res5, false>;
//  ^?

type res6 = Core.Apply<CompareDefinition.$IsLessThan, [[9], [1, 0]]>;
//   ^?
type TestRes6 = Helper.Test<res6, true>;
//   ^?

type res7 = Core.Apply<CompareDefinition.$IsGreaterThan, [[9], [1, 0]]>;
//   ^?

type TestRes7 = Helper.Test<res7, false>;
//   ^?

type res8 = Core.Apply<CompareDefinition.$IsLessThanOrEqual, [[9], [1, 0]]>;
//   ^?
type TestRes8 = Helper.Test<res8, true>;
//   ^?

type res9 = Core.Apply<CompareDefinition.$IsGreaterThanOrEqual, [[9], [1, 0]]>;
//   ^?
type TestRes9 = Helper.Test<res9, false>;
//   ^?

// now we compare 2 with 2

type res10 = Core.Apply<CompareDefinition.$IsEqual, [[1, 0], [1, 0]]>;
//   ^?
type TestRes10 = Helper.Test<res10, true>;
//   ^?

type res11 = Core.Apply<CompareDefinition.$IsLessThan, [[1, 0], [1, 0]]>;
//   ^?
type TestRes11 = Helper.Test<res11, false>;
//   ^?

type res12 = Core.Apply<CompareDefinition.$IsGreaterThan, [[1, 0], [1, 0]]>;
//   ^?
type TestRes12 = Helper.Test<res12, false>;
//   ^?

type res13 = Core.Apply<CompareDefinition.$IsLessThanOrEqual, [[1, 0], [1, 0]]>;
//   ^?
type TestRes13 = Helper.Test<res13, true>;
//   ^?

type res14 = Core.Apply<
  CompareDefinition.$IsGreaterThanOrEqual,
  [[1, 0], [1, 0]]
>;
//   ^?
type TestRes14 = Helper.Test<res14, true>;
//   ^?

// now we compare 2 with 3

type res15 = Core.Apply<CompareDefinition.$IsEqual, [[1, 0], [1, 1]]>;
//   ^?
type TestRes15 = Helper.Test<res15, false>;
//   ^?

type res16 = Core.Apply<CompareDefinition.$IsLessThan, [[1, 0], [1, 1]]>;
//   ^?
type TestRes16 = Helper.Test<res16, true>;
//   ^?

type res17 = Core.Apply<CompareDefinition.$IsGreaterThan, [[1, 0], [1, 1]]>;
//   ^?
type TestRes17 = Helper.Test<res17, false>;
//   ^?

type res18 = Core.Apply<CompareDefinition.$IsLessThanOrEqual, [[1, 0], [1, 1]]>;
//   ^?
type TestRes18 = Helper.Test<res18, true>;
//   ^?

type res19 = Core.Apply<
  CompareDefinition.$IsGreaterThanOrEqual,
  [[1, 0], [1, 1]]
>;
//   ^?
type TestRes19 = Helper.Test<res19, false>;
//   ^?
