// import { Join, SplitEmpty, TrimLeftChar } from "./ts-string-utils";

// // Digits
// type Zero = "0";
// type One = "1";
// type Two = "2";
// type Three = "3";
// type Four = "4";
// type Five = "5";
// type Six = "6";
// type Seven = "7";
// type Eight = "8";
// type Nine = "9";

// type Digits =
//   | Zero
//   | One
//   | Two
//   | Three
//   | Four
//   | Five
//   | Six
//   | Seven
//   | Eight
//   | Nine;

// //Helper
// export type ZipDigits<
//   DigitTuple0,
//   DigitTuple1,
//   TAgg extends unknown[] = [],
// > = DigitTuple0 extends [...infer Init0, infer Last0]
//   ? DigitTuple1 extends [...infer Init1, infer Last1]
//     ? ZipDigits<Init0, Init1, [[Last0, Last1], ...TAgg]>
//     : ZipDigits<Init0, [], [[Last0, Zero], ...TAgg]>
//   : DigitTuple1 extends [...infer Init1, infer Last1]
//   ? ZipDigits<[], Init1, [[Zero, Last1], ...TAgg]>
//   : TAgg;

// // Tables
// type AddDigitTable<Digit0, Digit1> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? {
//         "0": {
//           "0": "0";
//           "1": "1";
//           "2": "2";
//           "3": "3";
//           "4": "4";
//           "5": "5";
//           "6": "6";
//           "7": "7";
//           "8": "8";
//           "9": "9";
//         };
//         "1": {
//           "0": "1";
//           "1": "2";
//           "2": "3";
//           "3": "4";
//           "4": "5";
//           "5": "6";
//           "6": "7";
//           "7": "8";
//           "8": "9";
//           "9": "0";
//         };
//         "2": {
//           "0": "2";
//           "1": "3";
//           "2": "4";
//           "3": "5";
//           "4": "6";
//           "5": "7";
//           "6": "8";
//           "7": "9";
//           "8": "0";
//           "9": "1";
//         };
//         "3": {
//           "0": "3";
//           "1": "4";
//           "2": "5";
//           "3": "6";
//           "4": "7";
//           "5": "8";
//           "6": "9";
//           "7": "0";
//           "8": "1";
//           "9": "2";
//         };
//         "4": {
//           "0": "4";
//           "1": "5";
//           "2": "6";
//           "3": "7";
//           "4": "8";
//           "5": "9";
//           "6": "0";
//           "7": "1";
//           "8": "2";
//           "9": "3";
//         };
//         "5": {
//           "0": "5";
//           "1": "6";
//           "2": "7";
//           "3": "8";
//           "4": "9";
//           "5": "0";
//           "6": "1";
//           "7": "2";
//           "8": "3";
//           "9": "4";
//         };
//         "6": {
//           "0": "6";
//           "1": "7";
//           "2": "8";
//           "3": "9";
//           "4": "0";
//           "5": "1";
//           "6": "2";
//           "7": "3";
//           "8": "4";
//           "9": "5";
//         };
//         "7": {
//           "0": "7";
//           "1": "8";
//           "2": "9";
//           "3": "0";
//           "4": "1";
//           "5": "2";
//           "6": "3";
//           "7": "4";
//           "8": "5";
//           "9": "6";
//         };
//         "8": {
//           "0": "8";
//           "1": "9";
//           "2": "0";
//           "3": "1";
//           "4": "2";
//           "5": "3";
//           "6": "4";
//           "7": "5";
//           "8": "6";
//           "9": "7";
//         };
//         "9": {
//           "0": "9";
//           "1": "0";
//           "2": "1";
//           "3": "2";
//           "4": "3";
//           "5": "4";
//           "6": "5";
//           "7": "6";
//           "8": "7";
//           "9": "8";
//         };
//       }[Digit0][Digit1]
//     : never
//   : never;

// type AddRemainderTable<Digit0, Digit1> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? {
//         "0": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "0";
//           "9": "0";
//         };
//         "1": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "0";
//           "9": "1";
//         };
//         "2": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "1";
//           "9": "1";
//         };
//         "3": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "4": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "5": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "6": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "7": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "1";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "8": {
//           "0": "0";
//           "1": "0";
//           "2": "1";
//           "3": "1";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "9": {
//           "0": "0";
//           "1": "1";
//           "2": "1";
//           "3": "1";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//       }[Digit0][Digit1]
//     : never
//   : never;

// type IncrementDigit<Digit> = Digit extends Digits
//   ? {
//       "0": "1";
//       "1": "2";
//       "2": "3";
//       "3": "4";
//       "4": "5";
//       "5": "6";
//       "6": "7";
//       "7": "8";
//       "8": "9";
//       "9": "0";
//     }[Digit]
//   : never;

// // Adding
// type AddDigit<Digit0, Digit1, Remainder> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? Remainder extends One
//       ? IncrementDigit<AddDigitTable<Digit0, Digit1>>
//       : AddDigitTable<Digit0, Digit1>
//     : never
//   : never;

// type AddRemainder<Digit0, Digit1, Remainder> = Remainder extends One
//   ? Nine extends Digit1 | Digit0
//     ? One
//     : AddRemainderTable<Digit0, Digit1>
//   : AddRemainderTable<Digit0, Digit1>;

// type AddDigits<
//   DigitTuples,
//   Remainder,
//   TAgg extends string[] = [],
// > = DigitTuples extends [...infer Init, [infer Addend0, infer Addend1]]
//   ? AddDigits<
//       Init,
//       AddRemainder<Addend0, Addend1, Remainder>,
//       [AddDigit<Addend0, Addend1, Remainder>, ...TAgg]
//     >
//   : [...(Remainder extends Zero ? [] : [Remainder]), ...TAgg];

// export type Add<Addend0, Addend1> = Join<
//   AddDigits<ZipDigits<SplitEmpty<Addend0>, SplitEmpty<Addend1>>, "0">,
//   ""
// >;

// type DecrementDigit<Digit> = Digit extends Digits
//   ? {
//       "1": "0";
//       "2": "1";
//       "3": "2";
//       "4": "3";
//       "5": "4";
//       "6": "5";
//       "7": "6";
//       "8": "7";
//       "9": "8";
//       "0": "9";
//     }[Digit]
//   : never;

// type SubDigitTable<Digit0, Digit1> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? {
//         "0": {
//           "0": "0";
//           "1": "9";
//           "2": "8";
//           "3": "7";
//           "4": "6";
//           "5": "5";
//           "6": "4";
//           "7": "3";
//           "8": "2";
//           "9": "1";
//         };
//         "1": {
//           "0": "1";
//           "1": "0";
//           "2": "9";
//           "3": "8";
//           "4": "7";
//           "5": "6";
//           "6": "5";
//           "7": "4";
//           "8": "3";
//           "9": "2";
//         };
//         "2": {
//           "0": "2";
//           "1": "1";
//           "2": "0";
//           "3": "9";
//           "4": "8";
//           "5": "7";
//           "6": "6";
//           "7": "5";
//           "8": "4";
//           "9": "3";
//         };
//         "3": {
//           "0": "3";
//           "1": "2";
//           "2": "1";
//           "3": "0";
//           "4": "9";
//           "5": "8";
//           "6": "7";
//           "7": "6";
//           "8": "5";
//           "9": "4";
//         };
//         "4": {
//           "0": "4";
//           "1": "3";
//           "2": "2";
//           "3": "1";
//           "4": "0";
//           "5": "9";
//           "6": "8";
//           "7": "7";
//           "8": "6";
//           "9": "5";
//         };
//         "5": {
//           "0": "5";
//           "1": "4";
//           "2": "3";
//           "3": "2";
//           "4": "1";
//           "5": "0";
//           "6": "9";
//           "7": "8";
//           "8": "7";
//           "9": "6";
//         };
//         "6": {
//           "0": "6";
//           "1": "5";
//           "2": "4";
//           "3": "3";
//           "4": "2";
//           "5": "1";
//           "6": "0";
//           "7": "9";
//           "8": "8";
//           "9": "7";
//         };
//         "7": {
//           "0": "7";
//           "1": "6";
//           "2": "5";
//           "3": "4";
//           "4": "3";
//           "5": "2";
//           "6": "1";
//           "7": "0";
//           "8": "9";
//           "9": "8";
//         };
//         "8": {
//           "0": "8";
//           "1": "7";
//           "2": "6";
//           "3": "5";
//           "4": "4";
//           "5": "3";
//           "6": "2";
//           "7": "1";
//           "8": "0";
//           "9": "9";
//         };
//         "9": {
//           "0": "9";
//           "1": "8";
//           "2": "7";
//           "3": "6";
//           "4": "5";
//           "5": "4";
//           "6": "3";
//           "7": "2";
//           "8": "1";
//           "9": "0";
//         };
//       }[Digit0][Digit1]
//     : never
//   : never;

// type SubRemainderTable<Digit0, Digit1> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? {
//         "0": {
//           "0": "0";
//           "1": "1";
//           "2": "1";
//           "3": "1";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "1": {
//           "0": "0";
//           "1": "0";
//           "2": "1";
//           "3": "1";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "2": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "1";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "3": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "4": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "5": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "6": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "7": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "1";
//           "9": "1";
//         };
//         "8": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "0";
//           "9": "1";
//         };
//         "9": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "0";
//           "9": "0";
//         };
//       }[Digit0][Digit1]
//     : never
//   : never;

// type SubDigit<Digit0, Digit1, Remainder> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? Remainder extends One
//       ? DecrementDigit<SubDigitTable<Digit0, Digit1>>
//       : SubDigitTable<Digit0, Digit1>
//     : never
//   : never;

// type SubRemainder<Digit0, Digit1, Remainder> = Remainder extends One
//   ? Nine extends Digit1 | Digit0
//     ? One
//     : SubRemainderTable<Digit0, Digit1>
//   : SubRemainderTable<Digit0, Digit1>;

// type SubDigits<
//   DigitTuples,
//   Remainder,
//   TAgg extends string[] = [],
// > = DigitTuples extends [...infer Init, [infer Minuend, infer Subtrahend]]
//   ? SubDigits<
//       Init,
//       SubRemainder<Minuend, Subtrahend, Remainder>,
//       [SubDigit<Minuend, Subtrahend, Remainder>, ...TAgg]
//     >
//   : [...(Remainder extends Zero ? [] : [Remainder]), ...TAgg];

// export type Sub<Minuend, Subtrahend> = Join<
//   SubDigits<ZipDigits<SplitEmpty<Minuend>, SplitEmpty<Subtrahend>>, "0">,
//   ""
// >;

// type Num0 = "1000";
// type Num1 = "9999";
// type SplittedNum0 = SplitEmpty<Num0>;
// type SplittedNum1 = SplitEmpty<Num1>;
// type ZippedDigits = ZipDigits<SplittedNum0, SplittedNum1>;
// type TestAdded = Sub<"7993", "7992">;

// type MultiplicationTable<Digit0, Digit1> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? {
//         "0": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "0";
//           "9": "0";
//         };
//         "1": {
//           "0": "0";
//           "1": "1";
//           "2": "2";
//           "3": "3";
//           "4": "4";
//           "5": "5";
//           "6": "6";
//           "7": "7";
//           "8": "8";
//           "9": "9";
//         };
//         "2": {
//           "0": "0";
//           "1": "2";
//           "2": "4";
//           "3": "6";
//           "4": "8";
//           "5": "0";
//           "6": "2";
//           "7": "4";
//           "8": "6";
//           "9": "8";
//         };
//         "3": {
//           "0": "0";
//           "1": "3";
//           "2": "6";
//           "3": "9";
//           "4": "2";
//           "5": "5";
//           "6": "8";
//           "7": "1";
//           "8": "4";
//           "9": "7";
//         };
//         "4": {
//           "0": "0";
//           "1": "4";
//           "2": "8";
//           "3": "2";
//           "4": "6";
//           "5": "0";
//           "6": "4";
//           "7": "8";
//           "8": "2";
//           "9": "6";
//         };
//         "5": {
//           "0": "0";
//           "1": "5";
//           "2": "0";
//           "3": "5";
//           "4": "0";
//           "5": "5";
//           "6": "0";
//           "7": "5";
//           "8": "0";
//           "9": "5";
//         };
//         "6": {
//           "0": "0";
//           "1": "6";
//           "2": "2";
//           "3": "8";
//           "4": "4";
//           "5": "0";
//           "6": "6";
//           "7": "2";
//           "8": "8";
//           "9": "4";
//         };
//         "7": {
//           "0": "0";
//           "1": "7";
//           "2": "4";
//           "3": "1";
//           "4": "8";
//           "5": "5";
//           "6": "2";
//           "7": "9";
//           "8": "6";
//           "9": "3";
//         };
//         "8": {
//           "0": "0";
//           "1": "8";
//           "2": "6";
//           "3": "4";
//           "4": "2";
//           "5": "0";
//           "6": "8";
//           "7": "6";
//           "8": "4";
//           "9": "2";
//         };
//         "9": {
//           "0": "0";
//           "1": "9";
//           "2": "8";
//           "3": "7";
//           "4": "6";
//           "5": "5";
//           "6": "4";
//           "7": "3";
//           "8": "2";
//           "9": "1";
//         };
//       }[Digit0][Digit1]
//     : never
//   : never;

// type MultiplicationRemainderTable<Digit0, Digit1> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? {
//         "0": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "0";
//           "9": "0";
//         };
//         "1": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "0";
//           "6": "0";
//           "7": "0";
//           "8": "0";
//           "9": "0";
//         };
//         "2": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "0";
//           "5": "1";
//           "6": "1";
//           "7": "1";
//           "8": "1";
//           "9": "1";
//         };
//         "3": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "0";
//           "4": "1";
//           "5": "1";
//           "6": "1";
//           "7": "2";
//           "8": "2";
//           "9": "2";
//         };
//         "4": {
//           "0": "0";
//           "1": "0";
//           "2": "0";
//           "3": "1";
//           "4": "1";

//           "5": "2";
//           "6": "2";
//           "7": "2";
//           "8": "3";
//           "9": "3";
//         };
//         "5": {
//           "0": "0";
//           "1": "0";
//           "2": "1";
//           "3": "1";
//           "4": "2";

//           "5": "2";
//           "6": "3";
//           "7": "3";
//           "8": "4";
//           "9": "4";
//         };
//         "6": {
//           "0": "0";
//           "1": "0";
//           "2": "1";
//           "3": "1";
//           "4": "2";
//           "5": "3";
//           "6": "3";
//           "7": "4";
//           "8": "4";
//           "9": "5";
//         };
//         "7": {
//           "0": "0";
//           "1": "0";
//           "2": "1";
//           "3": "2";
//           "4": "2";
//           "5": "3";
//           "6": "4";
//           "7": "4";
//           "8": "5";
//           "9": "6";
//         };
//         "8": {
//           "0": "0";
//           "1": "0";
//           "2": "1";
//           "3": "2";
//           "4": "3";

//           "5": "4";
//           "6": "4";
//           "7": "5";
//           "8": "6";
//           "9": "7";
//         };
//         "9": {
//           "0": "0";
//           "1": "0";
//           "2": "1";
//           "3": "2";
//           "4": "3";
//           "5": "4";
//           "6": "5";
//           "7": "6";
//           "8": "7";
//           "9": "8";
//         };
//       }[Digit0][Digit1]
//     : never
//   : never;

// type MultiplyNumberWithSingleDigit<
//   Factor0,
//   Digit,
//   TRemainderAgg extends unknown[] = ["0"],
//   TProductAgg extends unknown[] = [],
// > = Factor0 extends [...infer Init, infer Last]
//   ? MultiplyNumberWithSingleDigit<
//       Init,
//       Digit,
//       [MultiplicationRemainderTable<Last, Digit>, ...TRemainderAgg],
//       [MultiplicationTable<Last, Digit>, ...TProductAgg]
//     >
//   : AddDigits<ZipDigits<TRemainderAgg, TProductAgg>, "0">;

// type MultiplyDigitTup<
//   Factor0,
//   Factor1,
//   TAgg extends any[] = [],
//   TDepth extends any[] = [],
// > = Factor1 extends [...infer Init, infer Last]
//   ? MultiplyDigitTup<
//       Factor0,
//       Init,
//       [[...MultiplyNumberWithSingleDigit<Factor0, Last>, ...TDepth], ...TAgg],
//       [...TDepth, Zero]
//     >
//   : SplitEmpty<
//       TrimLeftChar<Join<FoldLeft<TAgg, ["0"]>, "">, "0">
//     > extends infer Result
//   ? Result extends []
//     ? ["0"]
//     : Result
//   : never;
// // arrayutitl
// type FoldLeft<T, TAgg> = T extends [...infer Init, infer Last]
//   ? FoldLeft<Init, AddDigits<ZipDigits<Last, TAgg>, "0">>
//   : TAgg;
// type FoldTest = FoldLeft<SplitEmpty<"123">, ["4"]>;

// type Test = MultiplyDigitTup<SplitEmpty<"923">, SplitEmpty<"894">>;
// type Test0 = MultiplyNumberWithSingleDigit<SplitEmpty<"123">, "2">;
// type Test1 = MultiplyNumberWithSingleDigit<SplitEmpty<"123">, "2">;
// type Test2 = MultiplyNumberWithSingleDigit<SplitEmpty<"123">, "4">;
// type TestFold = FoldLeft<
//   [
//     ["0", "2", "4", "6", "0", "0"],
//     ["0", "2", "4", "6", "0"],
//     ["0", "4", "9", "2"],
//   ],
//   ["0"]
// >;

// // Comparison
// type Equal = "0";
// type Greater = "1";
// type Less = "-1";
// type DigitCompareTable<Digit0, Digit1> = Digit0 extends Digits
//   ? Digit1 extends Digits
//     ? {
//         "0": {
//           "0": Equal;
//           "1": Less;
//           "2": Less;
//           "3": Less;
//           "4": Less;
//           "5": Less;
//           "6": Less;
//           "7": Less;
//           "8": Less;
//           "9": Less;
//         };
//         "1": {
//           "0": Greater;
//           "1": Equal;
//           "2": Less;
//           "3": Less;
//           "4": Less;
//           "5": Less;
//           "6": Less;
//           "7": Less;
//           "8": Less;
//           "9": Less;
//         };
//         "2": {
//           "0": Greater;
//           "1": Greater;
//           "2": Equal;
//           "3": Less;
//           "4": Less;
//           "5": Less;
//           "6": Less;
//           "7": Less;
//           "8": Less;
//           "9": Less;
//         };
//         "3": {
//           "0": Greater;
//           "1": Greater;
//           "2": Greater;
//           "3": Equal;
//           "4": Less;
//           "5": Less;
//           "6": Less;
//           "7": Less;
//           "8": Less;
//           "9": Less;
//         };
//         "4": {
//           "0": Greater;
//           "1": Greater;
//           "2": Greater;
//           "3": Greater;
//           "4": Equal;
//           "5": Less;
//           "6": Less;
//           "7": Less;
//           "8": Less;
//           "9": Less;
//         };
//         "5": {
//           "0": Greater;
//           "1": Greater;
//           "2": Greater;
//           "3": Greater;
//           "4": Greater;
//           "5": Equal;
//           "6": Less;
//           "7": Less;
//           "8": Less;
//           "9": Less;
//         };
//         "6": {
//           "0": Greater;
//           "1": Greater;
//           "2": Greater;
//           "3": Greater;
//           "4": Greater;
//           "5": Greater;
//           "6": Equal;
//           "7": Less;
//           "8": Less;
//           "9": Less;
//         };
//         "7": {
//           "0": Greater;
//           "1": Greater;
//           "2": Greater;
//           "3": Greater;
//           "4": Greater;
//           "5": Greater;
//           "6": Greater;
//           "7": Equal;
//           "8": Less;
//           "9": Less;
//         };
//         "8": {
//           "0": Greater;
//           "1": Greater;
//           "2": Greater;
//           "3": Greater;
//           "4": Greater;
//           "5": Greater;
//           "6": Greater;
//           "7": Greater;
//           "8": Equal;
//           "9": Less;
//         };
//         "9": {
//           "0": Greater;
//           "1": Greater;
//           "2": Greater;
//           "3": Greater;
//           "4": Greater;
//           "5": Greater;
//           "6": Greater;
//           "7": Greater;
//           "8": Greater;
//           "9": Equal;
//         };
//       }[Digit0][Digit1]
//     : never
//   : never;
// // 9<10
// type IsLessDigitTup<DigitTup> = DigitTup extends [infer Head, ...infer Tail]
//   ? Head extends [infer Fst, infer Scd]
//     ? DigitCompareTable<Fst, Scd> extends Less
//       ? true
//       : DigitCompareTable<Fst, Scd> extends Equal
//       ? IsLessDigitTup<Tail>
//       : false
//     : never
//   : false;
// // type IsLessDigitTup<DigitTup> = CompareDigitTup<DigitTup>;
// // type IsLessOrEqualDigitTup<DigitTup> = CompareDigitTup<DigitTup, Greater>;
// // type IsGreaterOrEqualDigitTup<DigitTup> = CompareDigitTup<DigitTup, Less>;
// // type IsGreaterDigitTup<DigitTup> = CompareDigitTup<DigitTup, Less | Equal>;
// // type IsEqualDigitTup<DigitTup> = CompareDigitTup<DigitTup, Greater | Less>;
// type IsLess<Digit0, Digit1> = IsLessDigitTup<ZipDigits<Digit0, Digit1>>;

// // is rounding up at the moment
// type Division<Dividend, Divisor, TAgg extends unknown[] = ["1"]> = IsLess<
//   MultiplyDigitTup<TAgg, Divisor>,
//   Dividend
// > extends true
//   ? Division<Dividend, Divisor, AddDigits<ZipDigits<TAgg, Divisor>, Zero>>
//   : TAgg;

// // type L = IsLess<['1'], ['8']>;
// // type T = Division<SplitEmpty<'1233'>, SplitEmpty<'1234'>>;
// // type M = MultiplyDigitTup<['1', '0'], ['1']>;
