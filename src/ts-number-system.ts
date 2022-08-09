const x = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero",
};

// function printIncrement() {
//   const range = [...new Array(10).fill(0).keys()];
//   let s = "{";
//   for (const i of range) {
//     s += `[${x[i]}]:{`;
//     for (const j of range) {
//       s += `[${x[j]}]: [typeof ${x[(j + i) % 10]}, typeof ${
//         x[j + i >= 10 ? 1 : 0]
//       }];`;
//     }
//     s += "};";
//   }
//   s += "}";
//   return s;
// }
// function printDecremnt() {
//   const range = [...new Array(10).fill(0).keys()];
//   let s = "{";
//   for (const i of range) {
//     s += `[${x[i]}]:{`;
//     for (const j of range) {
//       const valIdx = i - j > 0 ? i - j : i - j === 0 ? 0 : 10 + (i - j);

//       s += `[${x[j]}]: [typeof ${x[valIdx]}, typeof ${x[i - j < 0 ? 1 : 0]}];`;
//     }
//     s += "};";
//   }
//   s += "}";
//   return s;
// }
// const y = ["same", "gt", "lt"];
// function printGT() {
//   const range = [...new Array(10).fill(0).keys()];
//   let s = "{";
//   for (const i of range) {
//     s += `[${x[i]}]:{`;
//     for (const j of range) {
//       const valIdx = i === j ? "same" : i > j ? "gt" : "lt";

//       s += `[${x[j]}]: typeof ${valIdx};`;
//     }
//     s += "};";
//   }
//   s += "}";
//   return s;
// }

// type X = Calculate<Number0, Number1, Add>;

// export type TsNumber = string;
// export type Zero = Empty;
// export type One = "0";
// export type Two = "00";
// export type Three = "000";
// export type Four = "0000";
// export type Five = "00000";
// export type Six = "000000";
// export type Seven = "0000000";
// export type Eight = "00000000";
// export type Nine = "000000000";
// type Ten = ParseTsNumber<10>;

// export type GetNumber<T extends string> = GetStringLength<T>;
// export type ParseTsNumber<
//   n,
//   TAgg extends TsNumber = Zero,
// > = GetNumber<TAgg> extends n ? TAgg : ParseTsNumber<n, Add<One, TAgg>>;

// export type Decrement<T> = T extends Empty ? never : RemoveFirstChar<T>;
// export type Increment<T extends TsNumber> = Add<T, One>;

// export type Add<TAddend0 extends string, TAddend1 extends TsNumber> = Concat<
//   TAddend0,
//   TAddend1
// >;
// export type Subtract<TMinuend, TSubtrahend> = TSubtrahend extends Zero
//   ? TMinuend
//   : Subtract<Decrement<TMinuend>, Decrement<TSubtrahend>>;

// export type Multiply<T0 extends TsNumber, T1 extends TsNumber> = Repeat_<
//   T0,
//   T1
// >;
// export type Division<
//   T0 extends TsNumber,
//   T1 extends TsNumber,
//   TAgg extends TsNumber = Zero,
// > = TAgg extends T1
//   ? Decrement<T0> extends never
//     ? One
//     : Add<One, Division<T0, T1, Zero>>
//   : Division<Decrement<T0>, T1, Add<One, TAgg>>;

// export type Factorial<T extends TsNumber> = T extends One | Zero | never
//   ? One
//   : Multiply<T, Factorial<Decrement<T>>>;

// export type Modulo<
//   T extends TsNumber,
//   TMod extends TsNumber,
//   TAgg extends TsNumber = Zero,
// > = Decrement<T> extends never
//   ? TAgg extends TMod
//     ? Zero
//     : TAgg
//   : TAgg extends TMod
//   ? Modulo<T, TMod, Zero>
//   : Modulo<Decrement<T>, TMod, Increment<TAgg>>;

// export type IsOdd<T extends TsNumber> = Modulo<T, Two> extends One
//   ? true
//   : false;

// export type IsEven<T extends TsNumber> = Call<$Not, IsOdd<T>>;

// export type IsDivisor<T extends TsNumber, TDivisor extends TsNumber> = Modulo<
//   T,
//   TDivisor
// > extends Zero
//   ? true
//   : false;

// export type Divisors<
//   T extends TsNumber,
//   TAgg extends TsNumber = One,
// > = TAgg extends T
//   ? TAgg
//   : IsDivisor<T, TAgg> extends true
//   ? TAgg | Divisors<T, Increment<TAgg>>
//   : Divisors<T, Increment<TAgg>>;

// export type IsPrime<T extends TsNumber> = Length<
//   UnionPermutations<Divisors<T>>
// > extends 2
//   ? true
//   : false;

// export type GetNthPrime<
//   T extends TsNumber,
//   TAgg extends TsNumber = Two,
// > = IsPrime<TAgg> extends true
//   ? Decrement<T> extends Zero
//     ? TAgg
//     : GetNthPrime<Decrement<T>, Increment<TAgg>>
//   : GetNthPrime<T, Increment<TAgg>>;

// export type Fibonacci<T extends TsNumber> = T extends "000" | Two | One | Zero
//   ? One
//   : Add<Fibonacci<Subtract<T, Two>>, Fibonacci<Decrement<T>>>;

// type TestDivisor = Divisors<Ten>;
// type TestPrime = IsPrime<Five>;
// type TestFibonacci = GetNumber<Fibonacci<Ten>>;
// type IsEvenTest = IsEven<Three>;
// type IsEvenTest1 = IsEven<Ten>;
// type IsOddTest = IsOdd<Three>;
// type IsOddTest1 = IsOdd<Ten>;

// type TestFactorial = GetNumber<Factorial<Five>>;
// type TestModulo = GetNumber<Modulo<Ten, ParseNumber<11>>>;
// type MultiplyTest = GetNumber<Multiply<Ten, '0000'>>;
// type DivisionTest = GetNumber<Division<Multiply<Ten, '00000'>, Ten>>;
// type GetNumberTest = GetNumber<Decrement<ParseNumber<2>>>;
// type TestIsDivisor = IsDivisor<Ten, Two>;
// type TestIsDivisor1 = IsDivisor<Ten, Three>;
