import { FoldLeft, Pair, ZipSoft } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import { Digit, ExoticNumber, Number, Zero } from "./constants";
import { AddingTable } from "./tables";

interface Add extends Lambda<[currentValue: Pair, aggregator: Pair]> {
  return: Args<this> extends [
    currentValue: Pair<Digit, Digit>,
    aggregator: Pair<Number, Digit>,
  ]
    ? Add__<Args<this>>
    : never;
}

type Add__<
  T extends [currentValue: Pair<Digit, Digit>, aggregator: Pair<Number, Digit>],
  PreviousValue extends Number = T[1][0],
  Left extends Digit = T[0][0],
  Right extends Digit = T[0][1],
  Intermediate extends Pair<Digit, Digit> = AddingTable[Left][Right],
  IntermediateRemainder extends Digit = Intermediate[1],
  IntermediateValue extends Digit = Intermediate[0],
  PreviousRemainder extends Digit = T[1][1],
  Next extends Pair<
    Digit,
    Digit
  > = AddingTable[IntermediateValue][PreviousRemainder],
  NextValue extends Digit = Next[0],
  NextRemainder extends Digit = AddingTable[Next[1]][IntermediateRemainder][0],
> = [[NextValue, ...PreviousValue], NextRemainder];

type ResolveAddRemainder<T extends Pair<Number, Digit>> = [T[1], ...T[0]];

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
  ResolveAddRemainder<FoldLeft<Prepped, Calc, [[], Zero]>>
>;