import { FoldLeft, GetLager, Map, Pair, ZipSoft } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import {
  Digit,
  ExoticNumber,
  Minus,
  negative,
  Number,
  One,
  OneExotic,
  positive,
  Zero,
} from "./constants";
import { AddingTable, SubtractionTable } from "./tables";
import { Calculate } from "./ts-number-calculator";
import { RemoveLeadingZeros } from "./ts-number-utils";

interface $Sub extends Lambda<[currentValue: Pair, aggregator: Pair]> {
  return: Args<this> extends [
    currentValue: Pair<Digit, Digit>,
    aggregator: Pair<Number, Digit>,
  ]
    ? Sub<Args<this>>
    : never;
}

type Sub<
  T extends [currentValue: Pair<Digit, Digit>, aggregator: Pair<Number, Digit>],
  PreviousValue extends Number = T[1][0],
  Left extends Digit = T[0][0],
  Right extends Digit = T[0][1],
  Intermediate extends Pair<Digit, Digit> = SubtractionTable[Left][Right],
  IntermediateRemainder extends Digit = Intermediate[1],
  IntermediateValue extends Digit = Intermediate[0],
  PreviousRemainder extends Digit = T[1][1],
  Next extends Pair<
    Digit,
    Digit
  > = SubtractionTable[IntermediateValue][PreviousRemainder],
  NextValue extends Digit = Next[0],
  NextRemainder extends Digit = AddingTable[Next[1]][IntermediateRemainder][0],
> = [[NextValue, ...PreviousValue], NextRemainder];

type ResolveSubRemainder<T extends Pair<Number, Digit>> = T[0];

export type SubtractorNegative<
  A extends ExoticNumber,
  B extends ExoticNumber,
> = Subtractor<
  { value: GetNextHigherDecimal<A, B>; sign: typeof positive },
  { value: RemoveLeadingZeros<Subtractor<A, B>>; sign: typeof negative }
>;

export type Subtractor<
  A extends ExoticNumber,
  B extends ExoticNumber,
> = RemoveLeadingZeros<
  ResolveSubRemainder<
    FoldLeft<ZipSoft<A["value"], B["value"], Zero>, $Sub, [[], Zero]>
  >
>;

export interface $ToZero extends Lambda {
  return: Zero;
}
type GetNextHigherDecimal<
  A extends ExoticNumber,
  B extends ExoticNumber,
> = GetLager<A["value"], B["value"]> extends infer Num
  ? Num extends Number
    ? [One, ...Map<Num, $ToZero>]
    : never
  : never;

export type Decrement<A extends ExoticNumber> = Calculate<A, OneExotic, Minus>;
