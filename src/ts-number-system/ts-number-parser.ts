import { Map } from "../ts-array-utils";
import { Args, Lambda } from "../ts-lambda";
import { SplitEmpty } from "../ts-string-utils";
import {
  eight,
  ExoticNumber,
  five,
  four,
  negative,
  nine,
  Number,
  one,
  positive,
  seven,
  six,
  three,
  two,
  zero,
} from "./constants";

export type NumberDigitTable = {
  "1": typeof one;
  "2": typeof two;
  "3": typeof three;
  "4": typeof four;
  "5": typeof five;
  "6": typeof six;
  "7": typeof seven;
  "8": typeof eight;
  "9": typeof nine;
  "0": typeof zero;
};
interface $NumberDigitTable extends Lambda {
  return: Args<this> extends keyof NumberDigitTable
    ? NumberDigitTable[Args<this>]
    : never;
}

export type ParseNumber<T extends string> = T extends `-${infer Number}`
  ? { value: Map<SplitEmpty<Number>, $NumberDigitTable>; sign: typeof negative }
  : { value: Map<SplitEmpty<T>, $NumberDigitTable>; sign: typeof positive };

export type WrapPositive<T extends Number> = {
  value: T;
  sign: typeof positive;
};

export type WrapNegative<T extends Number> = {
  value: T;
  sign: typeof negative;
};

export type Positive<T extends ExoticNumber> = {
  value: T["value"];
  sign: typeof positive;
};

export type Negative<T extends ExoticNumber> = {
  value: T["value"];
  sign: typeof negative;
};
