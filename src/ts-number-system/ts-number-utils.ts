import { FoldLeft, RemoveInit } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import { Number, Zero } from "./constants";
import { Adder } from "./ts-number-add";
import { WrapPositive } from "./ts-number-parser";

export type RemoveLeadingZeros<T extends Number> = RemoveInit<T, Zero>;

interface $Sum extends Lambda<[currentValue: unknown, aggregator: unknown]> {
  return: Args<this> extends [currentValue: Number, aggregator: Number]
    ? Adder<WrapPositive<Args<this>[0]>, WrapPositive<Args<this>[1]>>
    : never;
}

export type Sum<T extends Number[]> = FoldLeft<T, $Sum, [Zero]>;
