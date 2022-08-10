// import { Args, Lambda } from "../ts-lambda";
// import {
//   Five,
//   Modulo,
//   ParseTsNumber,
//   Three,
//   Zero,
// } from "../ts-number-system/generator";

// type Fizz<num> = Modulo<ParseTsNumber<num>, Three>;
// type Buzz<num> = Modulo<ParseTsNumber<num>, Five>;

// type Fizzbuzz<num> = num extends number
//   ? Zero extends Fizz<num> & Buzz<num>
//     ? "FizzBuzz"
//     : Zero extends Fizz<num>
//     ? "Fizz"
//     : Zero extends Buzz<num>
//     ? "Buzz"
//     : num
//   : never;

// interface $Fizzbuzz extends Lambda {
//   return: Fizzbuzz<Args<this>>;
// }
// // type r = Range<1, 300>;
// // type FizzbuzzTest = Map<r, $Fizzbuzz>;
