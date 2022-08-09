import { FoldLeft, GetLager, Map, Pair, ZipSoft } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import { Digit, ExoticNumber, Number, One, Positive, Zero } from "./constants";
import { SubtractionTable } from "./tables";
import { RemoveLeadingZeros } from "./ts-number-utils";
interface Sub extends Lambda<[currentValue: Pair, aggregator: Pair]> {
  return: Args<this> extends [
    currentValue: Pair<Digit, Digit>,
    aggregator: Pair<Number, Digit>,
  ]
    ? Sub__<Args<this>>
    : never;
}

type Sub__<
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
  NextRemainder extends Digit = SubtractionTable[Next[1]][IntermediateRemainder][0],
> = [[NextValue, ...PreviousValue], NextRemainder];

type ResolveSubRemainder<T extends Pair<Number, Digit>> = T[1] extends never
  ? [T[1], ...T[0]]
  : never;

type SubN<A extends ExoticNumber, B extends ExoticNumber> = Calculate<
  { value: GetNextHigherDecimal<A, B>; sign: Positive },
  { value: Calculate<A, B, Sub, SubResolver>; sign: Positive },
  Sub,
  SubResolver
>;

//99100
type O = SubN<U, C>;
type L = GetNextHigherDecimal<U, C>;
type F = Calculate<C, U, Sub, SubResolver>;
type V = Calculate<
  { value: GetNextHigherDecimal<U, C>; sign: Positive },
  { value: Calculate<C, U, Sub, SubResolver>; sign: Positive },
  Sub,
  SubResolver
>;

type Calculate<
  A extends ExoticNumber,
  B extends ExoticNumber,
  Calc extends Lambda<
    [currentValue: Pair, aggregator: Pair],
    Pair<Number, Digit>
  >,
  $Resolver extends Lambda<unknown, Digit[]>,
  Prepped extends Number = ZipSoft<A["value"], B["value"], Zero>,
> = RemoveLeadingZeros<
  ResolveSubRemainder<FoldLeft<Prepped, Calc, [[], Zero]>>
>;

interface $ToZero extends Lambda {
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
