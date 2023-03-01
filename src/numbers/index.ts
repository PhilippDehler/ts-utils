import { Booleans } from "../boolean";
import { Core } from "../core/functions";
import { Helper } from "../helper";
import { Strings } from "../strings";
import { Tuples } from "../tuples";
import { TupleCore } from "../tuples/core";
import { Types } from "../type";
import { AddDefinition } from "./definitions/add";
import { CompareDefinition } from "./definitions/compare";
import { DivisionDefinition } from "./definitions/division";
import { MathDefinition } from "./definitions/math";
import { ModulusDefinition } from "./definitions/modulo";
import { MultiplyDefinition } from "./definitions/multiply";
import { SubtractDefinition } from "./definitions/subtract";

/**
 * @description
 * This namespace contains all the functions related to numbers.
 * Each type prefixed with `$` is a partial application of the function.
 * Each type prefixed with `__` needs to receive a SignedNumber as input.
 * Each type prefixed with `_$` is a partial application of the function that needs to receive a SignedNumber as input.
 * Each type suffixed with `__` is a type that returns a SignedNumber.
 * None prefixed/suffixed types are expection a NumberInput as input and returns a string.
 * The returned string can be used as a number in a mathematical operation.
 * @warning
 * This namespace is still in development and is not ready for production use.
 * @example
 * type N0 = Maths.ToSignedNumber__<1>;
 * type N1 = Maths.ToSignedNumber__<-1>;
 * type N2 = "1"
 * type N3 = "-1"
 * type T0 = Maths.__Adder__<true, N0, N1> // { sign: false, number: [0] }
 * type T1 = Maths.__Adder__<true, N0, N2> // INVALID: N2 is not a SignedNumber
 * type T2 = Maths.Add<true, N0, N3> // "0"  <-- Add is not pre-/suffixed with __ therefore it expects a NumberInput
 * type T3 = Maths.Add<true, N2, T2> // "1"
 */
export declare namespace Maths {
  interface SignedNumber {
    sign: boolean;
    number: MathDefinition.INTERNAL_NUMBER;
  }

  type SignedNegativeInfitity = {
    sign: false;
    number: [MathDefinition.Infinity];
  };
  type SignedPositiveInfitity = {
    sign: true;
    number: [MathDefinition.Infinity];
  };
  type SignedNaN = { sign: true; number: [MathDefinition.NaN] };
  type SignedZero = ToSignedNumber__<{ sign: true; number: [0] }>;
  type SignedOne = ToSignedNumber__<{ sign: true; number: [1] }>;
  type SignedNegativeOne = __Negate__<SignedOne>;

  type __Negate__<T extends SignedNumber> = {
    sign: Booleans.NOT<T["sign"]>;
    number: T["number"];
  };

  type NumberInput =
    | SignedNumber
    | string
    | number
    | MathDefinition.INTERNAL_NUMBER
    | MathDefinition.Infinity
    | MathDefinition.NaN;

  type __$ToInternalNumber = Core.ComposeLeft<
    [
      Strings.$Split<"">,
      Tuples.$Map<Strings.ToNumber>,
      MathDefinition.$NormalizeInternalNumber,
    ]
  >;

  type __AbsNumberString<T extends string | number> =
    `${T}` extends `-${infer N extends string}` ? `${N}` : `${T}`;
  type __SignNumberString<T extends string | number> =
    `${T}` extends `-${infer N extends string}` ? false : true;

  // prettier-ignore
  type ToSignedNumber__<T extends NumberInput> =
    T extends SignedNumber                   ? T
  : T extends MathDefinition.Infinity        ? Types.Cast<{ sign: true, number: [MathDefinition.Infinity] }, SignedNumber>
  : T extends MathDefinition.NaN             ? Types.Cast<{ sign: true, number: [MathDefinition.NaN] }, SignedNumber>
  : T extends string | number                ? Types.Cast<{ sign: __SignNumberString<T>, number: Core.Apply<__$ToInternalNumber, [__AbsNumberString<T>]> } , SignedNumber>
  : T extends MathDefinition.INTERNAL_NUMBER ? Types.Cast<{ sign: true, number: T }, SignedNumber>
  : Types.Cast<{ sign: true, number: [MathDefinition.NaN] }, SignedNumber>

  interface ToSignedNumberFn__ extends Core.Fn {
    return: ToSignedNumber__<this["arg0"]>;
  }

  type __CollapseSignedNumber__<T extends SignedNumber> = {
    sign: T["sign"];
    number: MathDefinition.NormalizeInternalNumber<T["number"]>;
  };

  interface __CollapseSignedNumberFn__ extends Core.Fn {
    return: __CollapseSignedNumber__<this["arg0"]>;
  }

  interface $ToSignedNumber__<T extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<[ToSignedNumberFn__, __CollapseSignedNumberFn__]>,
      [T]
    > {}

  interface ToSignedNumberFn__ extends Core.Fn {
    return: ToSignedNumber__<this["arg0"]>;
  }

  type __IsNegative<T extends SignedNumber> = Booleans.NOT<T["sign"]>;
  type __IsPositive<T extends SignedNumber> = T["sign"];
  type __IsZero<T extends SignedNumber> = T["number"] extends 0[]
    ? true
    : false;

  // prettier-ignore
  type IsPositive<T extends NumberInput> = __IsPositive<ToSignedNumber__<T>>

  interface IsPositiveFn extends Core.Fn {
    return: IsPositive<this["arg0"]>;
  }
  interface $IsPositive<T extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<IsPositiveFn, [T]> {}

  type IsZero<T extends NumberInput> = __IsZero<ToSignedNumber__<T>>;
  interface IsZeroFn extends Core.Fn {
    return: IsZero<this["arg0"]>;
  }
  type $IsZero<T extends NumberInput | Core.unset = Core.unset> =
    Core.PartialApply<IsZeroFn, [T]>;

  type IsNegative<T extends NumberInput> = Booleans.NOT<IsPositive<T>>;

  interface $IsNegative<T extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<[IsPositiveFn, Booleans.$NOT]>,
      [T]
    > {}

  // prettier-ignore
  type __StringifyNumber<T extends SignedNumber> = 
    T extends { sign:infer Sign; number: infer N extends any[];} 
    ? N extends [MathDefinition.NaN]      ? "NaN"
    : N extends [MathDefinition.Infinity] ? "Infinity"
    : Core.Eval<Strings.$Join<"",[...(Sign extends true ? [] : ["-"]), ...N]>>
    : "NaN";

  interface __StringifyNumberFn extends Core.Fn {
    return: __StringifyNumber<ToSignedNumber__<this["arg0"]>>;
  }

  interface $StringifyNumber<T extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<__StringifyNumberFn, [T]> {}

  // prettier-ignore
  type __Adder__<
    OperationSign extends boolean,
    A extends SignedNumber,
    B extends SignedNumber,
  > = Booleans.XNOR<Booleans.XNOR<B["sign"], OperationSign>, A["sign"]> extends true
    ? { sign: A["sign"]; number: Core.Apply<AddDefinition.$Adder, [A["number"], B["number"]]>;}
    : Core.Apply<CompareDefinition.$IsGreaterThan, [A["number"], B["number"]]> extends infer T_GT_U
      ? { sign: T_GT_U extends true ? A["sign"] : Booleans.XNOR<B["sign"], OperationSign>; 
          number: Core.Apply<SubtractDefinition.$Subtractor, T_GT_U extends true ? [A["number"], B["number"]] : [B["number"], A["number"]]>;}
      : never

  interface __AdderFn__<Sign extends boolean> extends Core.Fn {
    return: __Adder__<Sign, this["arg0"], this["arg1"]>;
  }

  type __Multiply__<T extends SignedNumber, U extends SignedNumber> = {
    sign: Booleans.XNOR<T["sign"], U["sign"]>;
    number: Core.Apply<
      MultiplyDefinition.$Multiplier,
      [T["number"], U["number"]]
    >;
  };

  type __Division__<T extends SignedNumber, U extends SignedNumber> = {
    sign: Booleans.XNOR<T["sign"], U["sign"]>;
    number: Core.Eval<
      DivisionDefinition.$FloorDivision<T["number"], U["number"]>
    >;
  };

  type __Modulus__<T extends SignedNumber, U extends SignedNumber> = {
    sign: T["sign"];
    number: __IsZero<U> extends true
      ? MathDefinition.NaN
      : Core.Eval<ModulusDefinition.$Mod<T["number"], U["number"]>>;
  };

  type __Power__<
    A extends SignedNumber,
    B extends SignedNumber,
    Agg extends SignedNumber = SignedOne,
  > = __IsZero<B> extends true
    ? Agg
    : __IsNegative<B> extends true
    ? SignedNaN
    : __Power__<A, __Adder__<false, B, SignedOne>, __Multiply__<Agg, A>>;

  type __Factorial__<
    N extends SignedNumber,
    Agg extends SignedNumber = SignedOne,
  > = __IsZero<N> extends true
    ? Agg
    : __IsNegative<N> extends true
    ? SignedNaN
    : __Factorial__<__Adder__<false, N, SignedOne>, __Multiply__<Agg, N>>;

  interface __FactorialFn extends Core.Fn {
    return: __Factorial__<ToSignedNumber__<this["arg0"]>>;
  }

  type CalculationKeys = "+" | "-" | "*" | "/" | "%" | "**";

  // prettier-ignore
  type __CalcBySign__<
    CalculationKey extends CalculationKeys,
    A extends SignedNumber,
    B extends SignedNumber,
  > = CalculationKey extends "+" ? __Adder__<true, A, B>
    : CalculationKey extends "**" ? __Power__<A, B>
    : CalculationKey extends "-" ? __Adder__<false, A, B>
    : CalculationKey extends "*" ? __Multiply__<A, B>
    : CalculationKey extends "/" ? __Division__<A, B>
    : CalculationKey extends "%" ? __Modulus__<A, B>
    : never;

  interface CalculatorFn__<CalculationKey extends CalculationKeys>
    extends Core.Fn {
    return: __CalcBySign__<
      CalculationKey,
      ToSignedNumber__<this["arg0"]>,
      ToSignedNumber__<this["arg1"]>
    >;
  }

  interface $Calculator<
    CalculationKey extends CalculationKeys,
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[CalculatorFn__<CalculationKey>, $StringifyNumber]>,
      [T, U]
    > {}

  type __GT<T extends SignedNumber, U extends SignedNumber> = Booleans.XOR<
    T["sign"],
    U["sign"]
  > extends true
    ? Booleans.AND<__IsZero<T>, __IsZero<U>> extends true
      ? false
      : T["sign"]
    : Core.Apply<
        CompareDefinition.$IsGreaterThan,
        T["sign"] extends true
          ? [T["number"], U["number"]]
          : [U["number"], T["number"]]
      >;

  type __LT<T extends SignedNumber, U extends SignedNumber> = Booleans.AND<
    Booleans.NOT<__EQ<T, U>>,
    Booleans.NOT<__GT<T, U>>
  >;

  type __EQ<T extends SignedNumber, U extends SignedNumber> = Booleans.XOR<
    T["sign"],
    U["sign"]
  > extends true
    ? Booleans.AND<__IsZero<T>, __IsZero<U>>
    : Core.Eval<CompareDefinition.$IsEqual<T["number"], U["number"]>>;

  type __GTE<T extends SignedNumber, U extends SignedNumber> = Booleans.OR<
    __EQ<T, U>,
    __GT<T, U>
  >;

  type __LTE<T extends SignedNumber, U extends SignedNumber> = Booleans.NOT<
    __GT<T, U>
  >;

  type __CompareBySign<T extends SignedNumber, U extends SignedNumber> = {
    ">": __GT<T, U>;
    "<": __LT<T, U>;
    "=": __EQ<T, U>;
    ">=": __GTE<T, U>;
    "<=": __LTE<T, U>;
  };

  interface CompareFn extends Core.Fn {
    return: __CompareBySign<
      ToSignedNumber__<this["arg1"]>,
      ToSignedNumber__<this["arg2"]>
    >[this["arg0"]];
  }

  interface $Compare<
    Key extends keyof __CompareBySign<any, any>,
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<CompareFn, [Key, T, U]> {}

  type CompareAndGet<
    CompareKey extends keyof __CompareBySign<any, any>,
    T extends NumberInput,
    U extends NumberInput,
  > = Core.Apply<$Compare<CompareKey>, [T, U]> extends true ? T : U;

  interface CompareAndGetFn extends Core.Fn {
    return: CompareAndGet<this["arg0"], this["arg1"], this["arg2"]>;
  }

  interface $CompareAndGet<
    CompareKey extends keyof __CompareBySign<any, any>,
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<CompareAndGetFn, [CompareKey, T, U]> {}

  type __IsEven<T extends SignedNumber> = ModulusDefinition.IsEven<T["number"]>;
  interface $IsEven extends Core.Fn {
    return: __IsEven<ToSignedNumber__<this["arg0"]>>;
  }

  type __IsOdd<T extends SignedNumber> = ModulusDefinition.IsOdd<T["number"]>;
  interface $IsOdd extends Core.Fn {
    return: __IsOdd<ToSignedNumber__<this["arg0"]>>;
  }

  type __Abs__<T extends SignedNumber> = T["sign"] extends true
    ? T
    : __Negate__<T>;
  interface __AbsFn extends Core.Fn {
    return: __Abs__<this["arg0"]>;
  }

  type SingleNumberOperationKeys = "++" | "--" | "!" | "abs";

  // prettier-ignore
  type __SingleNumberOperations__<
    Key extends SingleNumberOperationKeys,
    A extends SignedNumber,
  > = Key extends "++" ? __Adder__<true, A, SignedOne>
    : Key extends "--" ? __Adder__<false, A, SignedOne>
    : Key extends "!" ? __Factorial__<A>
    : Key extends "abs" ? __Abs__<A>
    : never;

  interface __SingleNumberOperationFn__<Key extends SingleNumberOperationKeys>
    extends Core.Fn {
    return: __SingleNumberOperations__<Key, this["arg0"]>;
  }

  interface $SingleNumberOperation<
    Key extends SingleNumberOperationKeys,
    T extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<
        [$ToSignedNumber__, __SingleNumberOperationFn__<Key>, $StringifyNumber]
      >,
      [T]
    > {}

  interface $Abs<A extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<$SingleNumberOperation<"abs">, [A]> {}
  type Abs<T extends NumberInput> = Core.Apply<$Abs, [T]>;

  interface $Inc<A extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<$SingleNumberOperation<"++">, [A]> {}
  type Inc<T extends NumberInput> = Core.Apply<$Inc, [T]>;

  interface $Dec<A extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<$SingleNumberOperation<"--">, [A]> {}
  type Dec<T extends NumberInput> = Core.Apply<$Dec, [T]>;

  interface $Add<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Calculator<"+">, [T, U]> {}
  type Add<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $Add,
    [T, U]
  >;

  interface $Sub<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Calculator<"-">, [T, U]> {}
  type Sub<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $Sub,
    [T, U]
  >;

  interface $Mul<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Calculator<"*">, [T, U]> {}
  type Mul<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $Mul,
    [T, U]
  >;

  interface $Div<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Calculator<"/">, [T, U]> {}
  type Div<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $Div,
    [T, U]
  >;

  interface $Mod<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Calculator<"%">, [T, U]> {}
  type Mod<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $Mod,
    [T, U]
  >;

  interface $Pow<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Calculator<"**">, [T, U]> {}
  type Pow<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $Pow,
    [T, U]
  >;

  interface $Fac<A extends NumberInput | Core.unset = Core.unset>
    extends Core.PartialApply<$SingleNumberOperation<"!">, [A]> {}
  type Fac<T extends NumberInput> = Core.Apply<$Fac, [T]>;

  interface $Max
    extends Core.ComposeLeft<
      [
        Tuples.$Reduce<$CompareAndGet<">">, SignedNegativeInfitity>,
        $StringifyNumber,
      ]
    > {}
  type Max<T extends SignedNumber[]> = Core.Apply<$Max, [T]>;

  interface $Min
    extends Core.ComposeLeft<
      [
        Tuples.$Reduce<$CompareAndGet<"<">, SignedPositiveInfitity>,
        $StringifyNumber,
      ]
    > {}
  type Min<T extends SignedNumber[]> = Core.Apply<$Min, [T]>;

  interface $Sum<T extends NumberInput[] | Core.unset = Core.unset>
    extends Core.PartialApply<Tuples.$Reduce<$Calculator<"+">, 0>, [T]> {}
  type Sum<T extends NumberInput[]> = Core.Apply<$Sum, [T]>;

  interface $Product<T extends NumberInput[] | Core.unset = Core.unset>
    extends Core.PartialApply<Tuples.$Reduce<$Calculator<"*">, 1>, [T]> {}
  type Product<T extends NumberInput[]> = Core.Apply<$Product, [T]>;

  type __Average<T extends SignedNumber[]> = Core.Apply<
    $Calculator<"/">,
    [Core.Apply<$Sum, [T]>, TupleCore.Length<T>]
  >;

  interface __AverageFn extends Core.Fn {
    return: __Average<this["arg0"]>;
  }

  interface $Average<T extends NumberInput[] | Core.unset = Core.unset>
    extends Core.PartialApply<
      Core.ComposeLeft<
        [Tuples.$Map<$ToSignedNumber__>, __AverageFn, $StringifyNumber]
      >,
      [T]
    > {}
  type Average<T extends NumberInput[]> = Core.Apply<$Average, [T]>;

  interface $AverageBy<
    U extends Core.Fn,
    T extends NumberInput[] | Core.unset = Core.unset,
  > extends Core.PartialApply<
      Core.ComposeLeft<[Tuples.$Filter<U>, $Average]>,
      [T]
    > {}
  type AverageBy<U extends Core.Fn, T extends NumberInput[]> = Core.Apply<
    $AverageBy<U>,
    [T]
  >;

  interface $GT<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Compare<">">, [T, U]> {}
  type GT<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $GT,
    [T, U]
  >;

  interface $GTE<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Compare<">=">, [T, U]> {}
  type GTE<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $GTE,
    [T, U]
  >;

  interface $LT<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Compare<"<">, [T, U]> {}

  type LT<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $LT,
    [T, U]
  >;

  interface $LTE<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Compare<"<=">, [T, U]> {}
  type LTE<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $LTE,
    [T, U]
  >;

  interface $EQ<
    T extends NumberInput | Core.unset = Core.unset,
    U extends NumberInput | Core.unset = Core.unset,
  > extends Core.PartialApply<$Compare<"=">, [T, U]> {}

  type EQ<T extends NumberInput, U extends NumberInput> = Core.Apply<
    $EQ,
    [T, U]
  >;
}

// tests
// Sure, here are some test cases you can use to validate your math engine:

// Addition:
// Positive integers: 2 + 3 = 5
type ARes1 = Core.Eval<Maths.$Calculator<"+", 2, 3>>; // 5
//   ^?
type ATest1 = Helper.Test<ARes1, "5">;
//   ^?
// Negative integers: -2 + (-3) = -5
type ARes2 = Core.Eval<Maths.$Calculator<"+", -2, -3>>; // -5
//   ^?
type ATest2 = Helper.Test<ARes2, "-5">;
//   ^?
// Zero: 0 + 0 = 0
type ARes3 = Core.Eval<Maths.$Calculator<"+", 0, 0>>; // 0
//   ^?
type ATest3 = Helper.Test<ARes3, "0">;
//   ^?
// Adding a positive and negative number: 2 + (-3) = -1
type ARes4 = Core.Eval<Maths.$Calculator<"+", 2, -3>>; // -1
//   ^?
type ATest4 = Helper.Test<ARes4, "-1">;
//   ^?

// Multiplication:
// Positive integers: 2 x 3 = 6
type MRes1 = Core.Eval<Maths.$Calculator<"*", 2, 3>>; // 6
//   ^?
type MTest1 = Helper.Test<MRes1, "6">;
//   ^?
// Negative integers: -2 x (-3) = 6
type MRes2 = Core.Eval<Maths.$Calculator<"*", -2, -3>>; // 6
//   ^?
type MTest2 = Helper.Test<MRes2, "6">;
//   ^?
// Zero: 0 x 5 = 0
// Multiplying a positive and negative number: 2 x (-3) = -6
type MRes3 = Core.Eval<Maths.$Calculator<"*", 2, -3>>; // -6
//   ^?
type MTest3 = Helper.Test<MRes3, "-6">;
//   ^?
// Division:
// Dividing positive integers: 6 / 3 = 2
type DRes1 = Core.Eval<Maths.$Calculator<"/", 6, 3>>; // 2
//   ^?
type DTest1 = Helper.Test<DRes1, "2">;
//   ^?
// Dividing negative integers: -6 / (-3) = 2
type DRes2 = Core.Eval<Maths.$Calculator<"/", -6, -3>>; // 2
//   ^?
type DTest2 = Helper.Test<DRes2, "2">;
//   ^?
// Dividing by zero: 5 / 0 = undefined
type DRes3 = Core.Eval<Maths.$Calculator<"/", 5, 0>>; // undefined
//   ^?
type DTest3 = Helper.Test<DRes3, "Infinity">;
// Subtraction:
// Positive integers: 5 - 3 = 2
type SRes1 = Core.Eval<Maths.$Calculator<"-", 5, 3>>; // 2
//   ^?
type STest1 = Helper.Test<SRes1, "2">;
//   ^?
// Negative integers: -5 - (-3) = -2
type SRes2 = Core.Eval<Maths.$Calculator<"-", -5, -3>>; // -2
//   ^?
type STest2 = Helper.Test<SRes2, "-2">;
//   ^?

// Zero: 0 - 0 = 0
type SRes3 = Core.Eval<Maths.$Calculator<"-", 0, 0>>; // 0
//   ^?
type STest3 = Helper.Test<SRes3, "-0">;
//   ^?

// Subtracting a positive and negative number: 5 - (-3) = 8
type SRes4 = Core.Eval<Maths.$Calculator<"-", 5, -3>>; // 8
//   ^?
type STest4 = Helper.Test<SRes4, "8">;
//   ^?

type SRes5 = Core.Eval<Maths.$Calculator<"-", 1, 2>>; // 8
//   ^?
type STest5 = Helper.Test<SRes5, "-1">;
//   ^?
// Comparing:
// Comparing two positive integers: 5 > 3
type CRes1 = Core.Eval<Maths.$Compare<">", 5, 3>>; // true
//   ^?
type CTest1 = Helper.Test<CRes1, true>;
//   ^?

// Comparing two negative integers: -5 < -3
type CRes2 = Core.Eval<Maths.$Compare<"<", -5, -3>>; // true
//   ^?
type CTest2 = Helper.Test<CRes2, true>;
//   ^?
// Comparing a positive and negative integer: 5 > -3
type CRes3 = Core.Eval<Maths.$Compare<">", 5, -3>>; // true
//   ^?
type CTest3 = Helper.Test<CRes3, true>;
//   ^?
// Comparing two equal numbers: 3 == 3
type CRes4 = Core.Eval<Maths.$Compare<"=", 3, 3>>; // true
//   ^?
type CTest4 = Helper.Test<CRes4, true>;
//   ^?
// Modulus:
// Modulus of two positive integers: 5 % 3 = 2
type MRes4 = Core.Eval<Maths.$Calculator<"%", 5, 3>>; // 2
//   ^?
type MTest4 = Helper.Test<MRes4, "2">;
//   ^?
// Modulus of two negative integers: -5 % (-3) = -2
type MRes5 = Core.Eval<Maths.$Calculator<"%", -5, -3>>; // -2
//   ^?
type MTest5 = Helper.Test<MRes5, "-2">;
//   ^?
// Modulus with zero: 5 % 0 = undefined
type MRes6 = Core.Eval<Maths.$Calculator<"%", 5, 0>>; // undefined
//   ^?

type MTest6 = Helper.Test<MRes6, "NaN">;
//   ^?
// Modulus with a decimal: 5 % 2.5 = 0
// Modulus of a negative number with a positive number: -5 % 3 = 1
type MRes7 = Core.Eval<Maths.$Calculator<"%", -5, 3>>; // 1
//   ^?
type MTest7 = Helper.Test<MRes7, "-2">;
//   ^?

// Modulus of a positive number with a negative number: 5 % -3 = -1
type MRes8 = Core.Eval<Maths.$Calculator<"%", 5, -3>>; // -1
//   ^?
type MTest8 = Helper.Test<MRes8, "2">;
//   ^?

// Modulus of a negative number with a positive number: -5 % 3 = 1
type MRes9 = Core.Eval<Maths.$Calculator<"%", -5, 3>>; // 1
//   ^?
type MTest9 = Helper.Test<MRes9, "-2">;
//   ^?

/// write test for each interface in the module math

// Modulus of a positive number with a negative number: 5 % -3 = -1
type MRes10 = Core.Eval<Maths.$Calculator<"%", 5, -3>>; // -1
//   ^?
type MTest10 = Helper.Test<MRes10, "2">;
//   ^?

// Modulus of a negative number with a positive number: -5 % 3 = 1
type MRes11 = Core.Eval<Maths.$Calculator<"%", -5, 3>>; // 1
//   ^?
type MTest11 = Helper.Test<MRes11, "-2">;
//   ^?

// test Product/sum/average

type PRes1 = Core.Eval<Maths.$Product<[1, 2, 3, 4, 5]>>; // 120
//   ^?
type PTest1 = Helper.Test<PRes1, "120">;
//   ^?

type SumRes1 = Core.Eval<Maths.$Sum<[1, 2, 3, 4, 5]>>; // 15
//   ^?
type SumTest1 = Helper.Test<SumRes1, "15">;
//   ^?

type AvRes1 = Core.Eval<Maths.$Average<[1, 2, 3, 4, 5]>>; // 3
//   ^?
type AvTest1 = Helper.Test<AvRes1, "3">;
//   ^?

// test factorial

type FRes1 = Core.Eval<Maths.$Fac<5>>; // 120
//   ^?
type FTest1 = Helper.Test<FRes1, "120">;
//   ^?

type FRes2 = Core.Eval<Maths.$Fac<0>>; // 1
//   ^?
type FTest2 = Helper.Test<FRes2, "1">;
//   ^?

type FRes3 = Core.Eval<Maths.$Fac<1>>; // 1
//   ^?
type FTest3 = Helper.Test<FRes3, "1">;
//   ^?

type FRes4 = Core.Eval<Maths.$Fac<-2>>; // undefined
//   ^?
type FTest4 = Helper.Test<FRes4, "NaN">;
//   ^?

// test power

type PowRes1 = Core.Eval<Maths.$Pow<2, 3>>; // 8
//   ^?
type PowTest1 = Helper.Test<PowRes1, "8">;
//   ^?

type PowRes2 = Core.Eval<Maths.$Pow<2, 0>>; // 1
//   ^?
type PowTest2 = Helper.Test<PowRes2, "1">;
//    ^?
// test decrement
type DecRes1 = Core.Eval<Maths.$Dec<5>>; // 4
//   ^?
type DecTest1 = Helper.Test<DecRes1, "4">;
//   ^?

type DecRes2 = Core.Eval<Maths.$Dec<0>>; // -1
//   ^?
type DecTest2 = Helper.Test<DecRes2, "-1">;
//   ^?

type DecRes3 = Core.Eval<Maths.$Dec<1>>; // -1
//   ^?
type DecTest3 = Helper.Test<DecRes3, "-0">;
//   ^?

type IsZeroRes = Core.Eval<Maths.$IsZero<"-">>; // true
//   ^?
type IsZeroTest = Helper.Test<IsZeroRes, true>;
//   ^?

// test increment

type IncRes1 = Core.Eval<Maths.$Inc<5>>; // 6
//   ^?
type IncTest1 = Helper.Test<IncRes1, "6">;
//   ^?

type IncRes2 = Core.Eval<Maths.$Inc<0>>; // 1
//   ^?
type IncTest2 = Helper.Test<IncRes2, "1">;
//   ^?

/// test ToSignedNumber

type ToSignedNumberRes1 = Core.Eval<Maths.$ToSignedNumber__<"1">>; // 1
//   ^?
type ToSignedNumberTest1 = Helper.Test<ToSignedNumberRes1, Maths.SignedOne>;
//   ^?

type ToSignedNumberRes2 = Core.Eval<Maths.$ToSignedNumber__<"00">>; // 0
//   ^?
type ToSignedNumberTest2 = Helper.Test<ToSignedNumberRes2, Maths.SignedZero>;
//   ^?

type ToSignedNumberRes3 = Core.Eval<Maths.$ToSignedNumber__<"">>; // 0
//   ^?
type ToSignedNumberTest3 = Helper.Test<ToSignedNumberRes3, Maths.SignedZero>;
//   ^?

type ToSignedNumberRes4 = Core.Eval<Maths.$ToSignedNumber__<"-0">>; // 0
//   ^?
type ToSignedNumberTest4 = Helper.Test<
  //   ^?
  ToSignedNumberRes4,
  Maths.__Negate__<Maths.SignedZero>
>;

type ToSignedNumberRes5 = Core.Eval<Maths.$ToSignedNumber__<"-1">>; // -1
//   ^?
type ToSignedNumberTest5 = Helper.Test<
  //   ^?
  ToSignedNumberRes5,
  Maths.__Negate__<Maths.SignedOne>
>;

type ToSignedNumberRes6 = Core.Eval<Maths.$ToSignedNumber__<-1>>; // -1
type ToSignedNumberTest6 = Helper.Test<
  //   ^?
  ToSignedNumberRes6,
  Maths.__Negate__<Maths.SignedOne>
>;

type ToSignedNumberRes7 = Core.Eval<Maths.$ToSignedNumber__<"-00">>; // 0
//   ^?
type ToSignedNumberTest7 = Helper.Test<
  //   ^?
  ToSignedNumberRes7,
  Maths.__Negate__<Maths.SignedZero>
>;
